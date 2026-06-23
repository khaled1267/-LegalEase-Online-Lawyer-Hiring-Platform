
export const fetchLawyers = async (filters = {}) => {

  
  try {
    const search = filters.search || "";
    const page = filters.page || "1";

    // cache: "no-store" দেওয়া হয়েছে যেন টাইপ করার সাথে সাথে ফ্রেশ ডাটা আসে
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/lawyers?search=${search}&page=${page}`,
      { cache: "no-store" }
    );

    if (!res.ok) return { lawyers: [], total: 0 };
    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    return { lawyers: [], total: 0 };
  }
};