import React from "react";
import useNonserch from "../../component/Hook/Nonserch";
import GalleyyPage from "../Gallery/GalleyyPage";

import { useGlobalState } from "../../../zustand/GalwryState";
import SearchHeader from "../Serch/SearchHeader";
import SearchInput from "../Serch/SearchInput";
import SerchPage from "../Serch/SerchPage";

const HomePage: React.FC = () => {
  const { searchQuery, setSearchQuery } = useGlobalState();
  const pageprop = useNonserch(searchQuery, 300);

  const isSearchActive = pageprop.trim() !== "";

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ">
        <SearchHeader />
        <SearchInput query={searchQuery} setQuery={setSearchQuery} />
      </div>

      {isSearchActive ? (
        <SerchPage pageprop={pageprop} query={searchQuery} />
      ) : (
        <GalleyyPage />
      )}
    </div>
  );
};

export default HomePage;
