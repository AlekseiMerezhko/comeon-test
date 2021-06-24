import React, { memo } from "react";

const Category = ({ categoriesFilter, category, handleFilterCategories }) => {
  const { id, name } = category;
  return (
    <div
      className={`category item ${
        categoriesFilter.includes(id) ? "active" : ""
      }`}
      onClick={() => handleFilterCategories(id)}
    >
      <div className="content">
        <div className="header">{name}</div>
      </div>
    </div>
  );
};

export default memo(Category);
