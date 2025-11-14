"use server"
export async function getAssignment(id){
    try {
        const res = await fetch(
            `${process.env.baseApi}/api/v1/tests/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        
        if (!res.ok) {
            const error = await res.json();
            // Return an error object
            return { success: false, error: error.message };
        }

        const final = await res.json();
        // Return a success object
        return { success: true, data: final };
    } catch (err) {
        // Return a generic error object
        return { success: false, error: "An unexpected error occurred." };
    }
}