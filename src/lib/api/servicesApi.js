const backendUrl = process.env.NEXT_PUBLIC_API_URL;

// ১. ডাটা লোড করা (Read)
export const fetchServices = async (lawyerEmail) => {
    try {
        const res = await fetch(`${backendUrl}/services?email=${lawyerEmail}`);
        if (!res.ok) throw new Error("Failed to fetch services");
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Error in fetchServicesApi:", error);
        return [];
    }
};

// ২. নতুন সার্ভিস যোগ করা (Create)
export const addService = async (serviceData) => {
    try {
        const res = await fetch(`${backendUrl}/services`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(serviceData)
        });
        return res.ok;
    } catch (error) {
        console.error("Error in addServiceApi:", error);
        return false;
    }
};

// ৩. সার্ভিস আপডেট করা (Update)
export const updateService = async (id, updatedData) => {
    try {
        const res = await fetch(`${backendUrl}/services/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });
        return res.ok;
    } catch (error) {
        console.error("Error in updateServiceApi:", error);
        return false;
    }
};

// ৪. সার্ভিস ডিলিট করা (Delete)
export const deleteService = async (id) => {
    try {
        const res = await fetch(`${backendUrl}/services/${id}`, { method: 'DELETE' });
        return res.ok;
    } catch (error) {
        console.error("Error in deleteServiceApi:", error);
        return false;
    }
};