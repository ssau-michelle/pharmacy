import { Button, Heading, Pane, TextInputField } from "evergreen-ui";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { StringParam, useQueryParams } from "use-query-params";
import { ISearchProps, searchMedicaments } from "../../api/pharmacies";

const SearchFields = () => {
  return (
    <>
      <Heading size={800}>Поиск</Heading>

      <Pane flex={1} display="flex" justifyContent="center" alignItems="center">
        <form>
          <Pane width={800}>
            <TextInputField
              className="search-field"
              display="flex"
              justifyContent="space-between"
              name="name"
              label="Название"
            />

            <TextInputField
              className="search-field"
              display="flex"
              justifyContent="space-between"
              name="category"
              label="Категория"
            />

            <TextInputField
              className="search-field"
              display="flex"
              justifyContent="space-between"
              name="activeSubstance"
              label="Действующее вещество"
            />

            <TextInputField
              className="search-field"
              display="flex"
              justifyContent="space-between"
              name="manufacturerName"
              label="Название производителя"
            />

            <TextInputField
              className="search-field"
              display="flex"
              justifyContent="space-between"
              name="country"
              label="Страна производителя"
            />

            <TextInputField
              className="search-field"
              display="flex"
              justifyContent="space-between"
              name="releaseForm"
              label="Форма выпуска"
            />

            <Pane textAlign="end">
              <Button type="submit" appearance="primary" width={120}>
                Искать
              </Button>
            </Pane>
          </Pane>
        </form>
      </Pane>
    </>
  );
};

const SearchPage = () => {
  const [query] = useQueryParams({
    name: StringParam,
    category: StringParam,
    activeSubstance: StringParam,
    manufacturerName: StringParam,
    country: StringParam,
    releaseForm: StringParam,
  });
  const [filteredQuery, setFilteredQuery] = useState<ISearchProps>({});
  const [medicaments, setMedicaments] = useState([]);

  const isObjectEmpty = (obj: any) => {
    return Object.keys(obj).length === 0;
  };

  useEffect(() => {
    const filteredQuery: ISearchProps = {};

    if (query.name) filteredQuery.name = query.name;
    if (query.category) filteredQuery.category = query.category;
    if (query.activeSubstance)
      filteredQuery.activeSubstance = query.activeSubstance;
    if (query.manufacturerName)
      filteredQuery.manufacturerName = query.manufacturerName;
    if (query.country) filteredQuery.country = query.country;
    if (query.releaseForm) filteredQuery.releaseForm = query.releaseForm;

    setFilteredQuery(filteredQuery);
  }, [query]);

  useEffect(() => {
    if (!isObjectEmpty(filteredQuery))
      searchMedicaments(filteredQuery)
        .then(({ data }) => setMedicaments(data))
        .catch((err) => console.error(err));
  }, [filteredQuery]);

  return (
    <Pane className="page">
      <Header type="search" />

      <Pane
        className="container"
        display="flex"
        flex={1}
        flexDirection="column"
      >
        {isObjectEmpty(filteredQuery) ? (
          <SearchFields />
        ) : (
          <div>{JSON.stringify(medicaments)}</div>
        )}
      </Pane>
    </Pane>
  );
};

export default SearchPage;
