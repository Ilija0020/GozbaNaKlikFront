import React, { useEffect, useState } from "react";
import { publicRestaurantService } from "../services/publicRestaurantService";
import { useForm } from "react-hook-form";
import RestaurantCard from "../components/RestaurantCard/RestaurantCard";
import "./RestaurantCatalogPage.scss";

const RestaurantCatalogPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [appliedFilters, setAppliedFilters] = useState({
    name: "",
    address: "",
    sortType: 0,
  });
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      address: "",
      sortType: 0,
    },
  });
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await publicRestaurantService.getRestaurants(
          appliedFilters.name,
          appliedFilters.address,
          appliedFilters.sortType,
          page,
        );

        setRestaurants(data.items);
        setPagination(data);
      } catch (error) {
        console.error(error);
        setError("Nije moguće učitati restorane");
      } finally {
        setIsLoading(false);
      }
    };

    loadRestaurants();
  }, [page, appliedFilters]);

  const handleSearch = (formData) => {
    setPage(1);

    setAppliedFilters({
      name: formData.name,
      address: formData.address,
      sortType: formData.sortType,
    });
  };

  if (isLoading) {
    return <p>Učitavanje restorana...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="restaurant-catalog">
      <h1 className="restaurant-catalog__title">Restorani</h1>

      <form
        className="restaurant-catalog__filters"
        onSubmit={handleSubmit(handleSearch)}
      >
        <div className="restaurant-catalog__filter-group">
          <label
            className="restaurant-catalog__label"
            htmlFor="restaurant-name"
          >
            Naziv restorana
          </label>
          <input
            className="restaurant-catalog__control"
            type="text"
            id="restaurant-name"
            placeholder="Unesite naziv"
            {...register("name")}
          />
        </div>

        <div className="restaurant-catalog__filter-group">
          <label
            className="restaurant-catalog__label"
            htmlFor="restaurant-address"
          >
            Adresa
          </label>
          <input
            className="restaurant-catalog__control"
            id="restaurant-address"
            type="text"
            placeholder="Unesite adresu"
            {...register("address")}
          />
        </div>

        <div className="restaurant-catalog__filter-group">
          <label
            className="restaurant-catalog__label"
            htmlFor="restaurant-sort"
          >
            Sortiranje
          </label>
          <select
            className="restaurant-catalog__control"
            id="restaurant-sort"
            {...register("sortType", {
              valueAsNumber: true,
            })}
          >
            <option value={0}>Naziv: A–Z</option>
            <option value={1}>Naziv: Z–A</option>
            <option value={2}>Adresa: A–Z</option>
            <option value={3}>Adresa: Z–A</option>
          </select>
        </div>

        <button className="restaurant-catalog__search-button" type="submit">
          Pretraži
        </button>
      </form>

      {restaurants.length === 0 ? (
        <p>Nema restorana koji odgovaraju pretrazi.</p>
      ) : (
        <div className="restaurant-catalog__list">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}

      {pagination && (
        <div className="restaurant-catalog__pagination">
          <button
            className="restaurant-catalog__page-button"
            type="button"
            disabled={!pagination.hasPreviousPage}
            onClick={() => setPage((currentPage) => currentPage - 1)}
          >
            Prethodna
          </button>

          <span className="restaurant-catalog__page-info">
            Stranica {pagination.pageIndex + 1} od {pagination.totalPages}
          </span>

          <button
            className="restaurant-catalog__page-button"
            type="button"
            disabled={!pagination.hasNextPage}
            onClick={() => setPage((currentPage) => currentPage + 1)}
          >
            Sledeća
          </button>
        </div>
      )}
    </section>
  );
};
export default RestaurantCatalogPage;
