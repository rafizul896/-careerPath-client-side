import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import JobCard from "../../components/JobCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const TabCategories = () => {
    const { data: jobs = [] } = useQuery({
        queryFn: () => getData(),
        queryKey: ['Alljobs']
    })

    const getData = async () => {
        const { data } = await axios(`https://job-seeking-flax.vercel.app/jobs`)
        return data;
    }

    return (
        <div className='container md:px-6 py-10 mx-auto'>
            <h1 className='text-3xl font-semibold text-center lg:text-3xl capitalize'>Browse Jobs By Categpries</h1>
            <p className='md:max-w-2xl mx-auto my-6 text-center text-gray-500'>
            Browse our extensive selection of job postings categorized by industry, skill set, or job type.  Filter through a wide range of opportunities to find positions that match your qualifications and career goals. Narrow down your search and land your dream job faster!
            </p>
            <Tabs>
                <div className='flex items-center justify-center'>
                    <TabList>
                        <Tab>All Jobs</Tab>
                        <Tab>On Site</Tab>
                        <Tab>Remote</Tab>
                        <Tab>Part-Time</Tab>
                        <Tab>Hybrid</Tab>
                    </TabList>
                </div>

                <TabPanel>
                    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-5'>
                        {
                            jobs.map(job => (
                                <JobCard key={job._id} job={job}></JobCard>
                            ))
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-5'>
                        {
                            jobs.filter(j => j.category === 'On Site').map(job => (
                                <JobCard key={job._id} job={job}></JobCard>
                            ))
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-5'>
                        {
                            jobs.filter(j => j.category === 'Remote').map(job => (
                                <JobCard key={job._id} job={job}></JobCard>
                            ))
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-5'>
                        {
                            jobs.filter(j => j.category === 'Part-Time').map(job => (
                                <JobCard key={job._id} job={job}></JobCard>
                            ))
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-5'>
                        {
                            jobs.filter(j => j.category === 'Hybrid').map(job => (
                                <JobCard key={job._id} job={job}></JobCard>
                            ))
                        }
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default TabCategories;