export const fetchAdminPayments = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/payments`, {
      cache: "no-store" // ক্যাশ আটকানোর জন্য
    });

    if (!res.ok) throw new Error("Failed to fetch admin payments");
    return await res.json();
  } catch (error) {
    console.error("Admin API Error:", error);
    return { payments: [] };
  }
};