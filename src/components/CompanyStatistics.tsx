import { useState, useEffect } from 'react';
import { Select, SelectChangeEvent, FormControl, MenuItem, Alert } from "@mui/material";
import DataService from "../api/DataService";
import { Company } from "../models/Company";
import CompanyChart from "./CompanyChart"
import { Container } from '@mui/system';

export default function CompanyStatistics() {

    const [companies, setCompanies] = useState<Company[] | null>([]);
    const [selectedCompany, setSelectedCompany] = useState<Number | undefined>(0);
    const [companyHistory, setCompanyHistory] = useState(null);
    const [hasDataError, setHasDataError] = useState(false);

    useEffect(() => {
        loadCompanies();
      }, [])

    async function loadCompanies() { 
        try {        
            setHasDataError(false);
            const companiesData = await DataService.Companies.get();            
            setCompanies(companiesData.datasets.sort((a: Company, b: Company) => a.name > b.name ? 1 : -1));
        } catch (error: any) {
            setHasDataError(true);
        }        
    }

    async function loadCompanyHistory(company: Company) { 
        try {        
            setHasDataError(false);
            const companyHistory = await DataService.Companies.getHistory(company.database_code, company.dataset_code);            
            setCompanyHistory(companyHistory.dataset_data.data)       
        } catch (error: any) {
            setHasDataError(true);
        }        
    }

    const handleCompanyChange = async (event: SelectChangeEvent<unknown>) => {        
        const selectedCompanyId = parseInt(event.target.value as string);
        setSelectedCompany(selectedCompanyId);
        if (selectedCompanyId > 0) {            
            const selectedCompany = companies?.filter(c => c.id === selectedCompanyId)[0];
        
            if (selectedCompany !== undefined) {
                await loadCompanyHistory(selectedCompany);            
            }
        } else {
            setCompanyHistory(null);
        }
      };
    
    return (        
        <FormControl fullWidth>
            <Alert severity="info">Select a company to generate a time series data chart.</Alert>
            <Select               
                style={{marginTop: '20px'}}                     
                id="company-select"
                value={selectedCompany} 
                onChange={handleCompanyChange}                                     
            >
            <MenuItem value={0}>Please select a company from the list</MenuItem>
            {companies?.map((company) => (
                <MenuItem key={company.id} value={company.id}>{company.name}</MenuItem>                                        
            ))}
            </Select>
            {hasDataError && 
                <Alert severity="error">Data or network error. Please try again!</Alert>
            }
            {companyHistory && !hasDataError &&
                <Container style={{paddingTop: '30px'}}>
                    <CompanyChart data={companyHistory} />
                </Container>
            }
        </FormControl>        
    )
}