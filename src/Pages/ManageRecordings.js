import React, { useState } from "react";
import { useGetRecordingsQuery } from "../Services/recordingsApi";
import RecordingsTable from "../Component/RecordingsTable";
import SearchForm from "../Component/SearchForm";

const ManageRecordings = () => {
  const [filters, setFilters] = useState({});

  const {
    data: recordings = [],
    isLoading,
    error,
  } = useGetRecordingsQuery(filters);

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
  };
  return (
    <div style={{ padding: "20px" }}>
      <h1>Manage Call Recordings</h1>
      <SearchForm onSearch={handleSearch} />

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading recordings</p>
      ) : (
        <RecordingsTable recordings={recordings} />
      )}
    </div>
  );
};

export default ManageRecordings;
