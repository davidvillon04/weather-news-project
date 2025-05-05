import React from "react";

export default function LocationForm({ searchTerm, setSearchTerm, handleSearch }) {
   return (
      <form onSubmit={handleSearch}>
         <input
            type="text"
            placeholder="Enter city, ZIP, or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
         />
         <button type="submit">Search</button>
      </form>
   );
}
