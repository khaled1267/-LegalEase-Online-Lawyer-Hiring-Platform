import UpdateProfile from "@/components/UpdateProfile";
import { getUserSession } from "@/lib/core/sesson";

export default async function ManageLegalProfilePage() {
    const userEmail = await getUserSession();
    // console.log("userEmail", userEmail);

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8">
            <UpdateProfile userEmail={userEmail?.email} />
        </div>
    );
}