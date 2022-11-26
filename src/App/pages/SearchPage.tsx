import {
  Button,
  Heading,
  Pane,
  Paragraph,
  Spinner,
  Text,
  TextInputField,
} from "evergreen-ui";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { StringParam, useQueryParams } from "use-query-params";
import { ISearchProps, searchMedicaments } from "../../api/pharmacies";
import { IMedicamentSearchResult } from "../../types";
import mockMedicineImage from "../../images/mockMedicineImage.png";
import { Link } from "react-router-dom";

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

interface ISearchResultsProps {
  searchResults: IMedicamentSearchResult[] | null;
}

const SearchResults = ({ searchResults }: ISearchResultsProps) => (
  <>
    <Heading size={800} marginBottom={16}>
      Результаты поиска
    </Heading>

    {searchResults ? (
      <Pane
        borderTop
        borderLeft
        display="grid"
        gridTemplateColumns="repeat(4, 1fr)"
        marginBottom={20}
      >
        {searchResults.map((sr) => (
          <Pane
            key={sr.medicament.id}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            borderBottom
            borderRight
            padding={16}
          >
            <Pane>
              <Pane textAlign="center">
                <img src={mockMedicineImage} alt="medicine icon" width={200} />
              </Pane>

              <Paragraph size={500} fontWeight="bold" textTransform="uppercase">
                {sr.medicament.name}
              </Paragraph>
              <Paragraph>{sr.medicament.manufacturer.name}</Paragraph>
              <Paragraph>{sr.medicament.releaseForm.name}</Paragraph>
            </Pane>

            <Pane>
              <Paragraph textAlign="right">Цена:</Paragraph>
              <Paragraph textAlign="right">
                от{" "}
                <Text size={500} fontWeight="bold">
                  {sr.minPrice}
                </Text>{" "}
                ₽
              </Paragraph>

              <Pane textAlign="center">
                <Link
                  to={`/medicaments/${sr.medicament.id}`}
                  className="link-not-underlined"
                >
                  <Button
                    borderRadius={16}
                    appearance="primary"
                  >{`Выбрать из ${sr.pharmacyCount}`}</Button>
                </Link>
              </Pane>
            </Pane>
          </Pane>
        ))}
      </Pane>
    ) : (
      <Pane flex={1} display="flex" justifyContent="center" alignItems="center">
        <Spinner />
      </Pane>
    )}
  </>
);

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
  const [medicaments, setMedicaments] = useState(null);

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
          <SearchResults searchResults={medicaments} />
        )}
      </Pane>
    </Pane>
  );
};

export default SearchPage;
