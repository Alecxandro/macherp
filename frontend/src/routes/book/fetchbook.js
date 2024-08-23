export async function fetchBook(token, url) {
  let book = {}  
  try {
      const response = await fetch(`http://localhost:3000/book/${url}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        book = await response.json();
        return book;
        
      } else {
        console.error("Failed to fetch book:", response.statusText);
        
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }