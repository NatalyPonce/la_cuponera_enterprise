import React from 'react'
import EmployeeList from './EmployeeList'
import { useForm } from 'react-hook-form';

const ManageEmployessPage = () => {

    const {
        register: registerCreateEmployee,
        handleSubmit: handleSubmitCreateEmployee,
        watch,
        formState: { errors: createEmployeeErrors },
    } = useForm();
    
    const onSubmitCreateEmployee = async (data) => {
        console.log("Create Employee Data:", data)
    };

    return (
        <div className="mt-12">
            <EmployeeList />
        </div>
    )
}

export default ManageEmployessPage