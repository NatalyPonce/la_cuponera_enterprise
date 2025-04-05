import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Calendar, Edit, Mail, MapPin, MoreHorizontal, Phone, Shield, Trash2, UserIcon } from "lucide-react"
import { useState } from "react"
import { set, useForm } from "react-hook-form"


export default function EmployeeCard({
    id,
    firstName,
    lastName,
    position,
    department,
    email,
    phone,
    location,
    joinDate,
    status,
    imageUrl,
    accessLevel,
    onEdit,
    onDelete,
    onViewDetails,
}) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const [firstNameR, setFirstNameR] = useState(firstName)
    const [lastNameR, setLastNameR] = useState(lastName)
    const [emailR, setEmailR] = useState(email)
    const [phoneR, setPhoneR] = useState(phone)
    const [locationR, setLocationR] = useState(location)

    const {
        register: registerEditEmployee,
        handleSubmit: handleSubmitEditEmployee,
        formState: { errors: editEmployeeErrors },
    } = useForm();

    const onSubmitEditEmployee = async (data) => {
        console.log("Edit Employee Data:", JSON.stringify(data));
        setIsEditing(true);

        const res = await fetch(`https://apiv1.lacuponera.store/api/v1/employees/${id}`, {
            method: 'PATCH',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            console.error('Error updating employee:', res.statusText);
            return;
        } else {
            console.log("Employee updated successfully")
        }

        setIsEditing(false);
        setIsEditDialogOpen(false);

        await res.json().then((d) => {
            setFirstNameR(data.firstName)
            setLastNameR(data.lastName)
            setEmailR(data.email)
            setPhoneR(data.phone)
            setLocationR(data.location)

            console.log("Employee data updated:", d);
        });
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", options)
    }

    const handleDelete = async () => {
        setIsDeleting(true)

        const res = await fetch(`https://apiv1.lacuponera.store/api/v1/employees/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        });
        if (!res.ok) {
            console.error('Error deleting employee:', res.statusText);
            return;
        } else {
            console.log("Employee deleted successfully")
        }

        setIsDeleting(false);
        setIsDeleteDialogOpen(false);
    }

    // Generate initials from name
    const getInitials = (name) => {
        return name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase()
            .substring(0, 2)
    }

    // Determine badge color based on status
    const getBadgeVariant = (status) => {
        switch (status) {
            case "active":
                return "success"
            case "on leave":
                return "warning"
            case "terminated":
                return "destructive"
            default:
                return "secondary"
        }
    }

    // Determine access level icon and text
    const getAccessLevelInfo = (level) => {
        switch (level) {
            case "admin":
                return { icon: <Shield className="h-3 w-3 mr-1 fill-current" />, text: "Admin" }
            case "manager":
                return { icon: <Shield className="h-3 w-3 mr-1" />, text: "Manager" }
            default:
                return { icon: <UserIcon className="h-3 w-3 mr-1" />, text: "Employee" }
        }
    }

    const accessLevelInfo = getAccessLevelInfo(accessLevel)
    const fullName = `${firstNameR} ${lastNameR}`

    return (
        <Card className="w-full max-w-md overflow-hidden">
            <CardHeader className="pb-0">
                <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16 border">
                            {imageUrl ? <AvatarImage src={imageUrl} alt={fullName} /> : null}
                            <AvatarFallback className="text-lg">{getInitials(fullName)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-semibold text-lg">{fullName}</h3>
                            <p className="text-sm text-muted-foreground">{position}</p>
                            <div className="flex items-center mt-1 space-x-2">
                                <Badge variant={getBadgeVariant(status)} className="capitalize">
                                    {status}
                                </Badge>
                                <Badge variant="outline" className="flex items-center">
                                    {accessLevelInfo.icon}
                                    {accessLevelInfo.text}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-6">
                <div className="space-y-2">
                    <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{emailR}</span>
                    </div>
                    <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{phoneR}</span>
                    </div>
                    <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{locationR}</span>
                    </div>
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs text-muted-foreground">Department</p>
                        <p className="text-sm font-medium">{department}</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Join Date</p>
                        <p className="text-sm font-medium flex items-center">
                            <Calendar className="h-3 w-3 mr-1 inline" />
                            {formatDate(joinDate)}
                        </p>
                    </div>
                </div>

                <div className="mt-4">
                    <p className="text-xs text-muted-foreground">Employee ID</p>
                    <p className="text-sm font-mono">{id}</p>
                </div>
            </CardContent>

            <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-3">
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => onEdit(id)} className="flex items-center gap-1">
                            <Edit className="h-4 w-4" />
                            Edit
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="w-full max-w-md">
                        <DialogHeader>
                            <DialogTitle>Edit Employee</DialogTitle>
                            <DialogDescription>
                                Make changes to the employee details and click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        {/* Add your edit form here */}

                        <form onSubmit={handleSubmitEditEmployee(onSubmitEditEmployee)} className="space-y-4">
                            <div className="grid gap-4">
                                <label className="block text-sm font-medium text-gray-700">First Name</label>
                                <input type="text" {...registerEditEmployee("firstName")} defaultValue={firstName} className="border rounded px-3 py-2" />

                                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input type="text" {...registerEditEmployee("lastName")} defaultValue={lastName} className="border rounded px-3 py-2" />

                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" {...registerEditEmployee("email")} defaultValue={emailR} className="border rounded px-3 py-2" />

                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input type="tel" {...registerEditEmployee("phone")} defaultValue={phoneR} className="border rounded px-3 py-2" />

                                <label className="block text-sm font-medium text-gray-700">Password (optional)</label>
                                <input type="text" {...registerEditEmployee("password", { required: false })} className="border rounded px-3 py-2" />
                            </div>

                            <DialogFooter className="mt-4">
                                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isEditing}>
                                    Cancel
                                </Button>
                                <Button variant="primary" onClick={() => onEdit(id)} disabled={isEditing}>
                                    {isEditing ? "Saving..." : "Save"}
                                </Button>
                            </DialogFooter>
                        </form>

                    </DialogContent>
                </Dialog>


                <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="destructive" size="sm" className="flex items-center gap-1">
                            <Trash2 className="h-4 w-4" />
                            Delete
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Employee Record</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete {fullName}'s record? This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="mt-4">
                            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isDeleting}>
                                Cancel
                            </Button>
                            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                                {isDeleting ? "Deleting..." : "Delete"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    )
}

