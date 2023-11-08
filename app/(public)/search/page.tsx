import React from "react";

function Search({ searchParams }: { searchParams: { search: string } }) {
  const { search } = searchParams;
  return <div>Search</div>;
}

export default Search;
