import ManageLegalProfileForm from "@/components/ManageLegalProfileForm";
import { getUserSession } from "@/lib/core/sesson";

export default async function ManageLegalProfilePage() {
    const user = await getUserSession();
    

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8">
            <ManageLegalProfileForm lawyerEmail={user?.email} />
        </div>
    );
}