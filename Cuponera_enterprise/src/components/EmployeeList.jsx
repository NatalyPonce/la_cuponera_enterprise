import React, { useEffect, useState } from 'react'
import EmployeeCard from './EmployeeCard';
import Header from './header/Header';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { Cross } from 'lucide-react';
import { useForm } from 'react-hook-form';

const EmployeeList = () => {

    const [employees, setEmployees] = useState([]);

    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [categories, setCategories] = useState([]);

    const {
        register: registerCreateEmployee,
        handleSubmit: handleSubmitCreateEmployee,
        watch,
        formState: { errors: createEmployeeErrors },
    } = useForm();

    const onSubmitCreateEmployee = async (data) => {
        setIsCreating(true);
        data.enterpriseId = 1;
        try {
            const response = await fetch('https://apiv1.lacuponera.store/api/v1/register/employee', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Error creating employee');
            }
            const result = await response.json();
            console.log('Employee created:', result);
            setIsCreateDialogOpen(false);
            setIsCreating(false);
            setEmployees((prev) => [...prev, result.user]);

        } catch (error) {
            console.error('Error creating employee:', error);
            setIsCreating(false);
        }
    };


    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('https://apiv1.lacuponera.store/api/v1/employees',
                    {
                        method: 'GET',
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('token')}`,
                        }
                    });
                const data = await response.json();
                setEmployees((prev) => [...data]);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };
        fetchEmployees();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <h1 className="text-3xl font-bold mb-4">Lista de Empleados</h1>

            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                    <Button size="lg" className="flex items-center gap-1 mb-4">
                        <Cross className="h-4 w-4" />
                        Agregar Empleado
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Employee</DialogTitle>
                        <DialogDescription>
                            Make changes to the employee details and click save when you're done.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmitCreateEmployee(onSubmitCreateEmployee)} className="space-y-4">
                        <div className="grid gap-4">
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            <input type="text" {...registerCreateEmployee("firstName")} className="border rounded px-3 py-2" />

                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input type="text" {...registerCreateEmployee("lastName")} className="border rounded px-3 py-2" />

                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" {...registerCreateEmployee("email")} className="border rounded px-3 py-2" />

                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input type="tel" {...registerCreateEmployee("phone")} className="border rounded px-3 py-2" />

                            <label className="block text-sm font-medium text-gray-700">Password (optional)</label>
                            <input type="text" {...registerCreateEmployee("password", { required: false })} className="border rounded px-3 py-2" />
                        </div>

                        <DialogFooter className="mt-4">
                            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} disabled={isCreating}>
                                Cancel
                            </Button>
                            <Button variant="primary" disabled={isCreating}>
                                {isCreating ? "Saving..." : "Save"}
                            </Button>
                        </DialogFooter>
                    </form>

                </DialogContent>
            </Dialog>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl p-4">
                {employees.map((employee, index) => (
                    <EmployeeCard
                        key={index}
                        id={employee.id}
                        firstName={employee.user.firstName}
                        lastName={employee.user.lastName}
                        position={"Seller"}
                        department={"Sales"}
                        email={employee.user.email}
                        phone={employee.phone}
                        location={employee.enterprise.location}
                        joinDate={employee.user.createdAt}
                        status={"Active"}
                        imageUrl={employee.imageUrl || "/placeholder.svg?height=200&width=200"}
                        accessLevel={"Employee"}
                        onEdit={() => console.log('Edit', employee.id)}
                        onDelete={() => console.log('Delete', employee.id)}
                        onViewDetails={() => console.log('View Details', employee.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default EmployeeList