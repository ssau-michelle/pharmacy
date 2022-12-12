import {
  Badge,
  Heading,
  Pane,
  Paragraph,
  Spinner,
  Table,
  Text,
} from "evergreen-ui";
import Header from "../components/Header";
import mockMedicineImage from "../../images/mockMedicineImage.png";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IAvailability, IMedicament } from "../../types";
import { getAllAvailabilities, getMedicament } from "../../api/pharmacies";

const MedicinePage = () => {
  const { id } = useParams();
  const [medicament, setMedicament] = useState<IMedicament | null>(null);
  const [availabilities, setAvailabilities] = useState<IAvailability[] | null>(
    null
  );

  useEffect(() => {
    if (!id) return;

    getMedicament(id)
      .then(({ data }) => setMedicament(data))
      .catch((err) => console.error(err));

    getAllAvailabilities(id)
      .then(({ data }) => setAvailabilities(data))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <Pane className="page">
      <Header type="search" />

      {medicament ? (
        <Pane className="container">
          <Pane display="flex">
            <img src={mockMedicineImage} alt="medicine icon" width={200} />

            <Pane marginLeft={60}>
              <Pane display="flex" alignItems="center">
                <Heading size={800} marginRight={16}>
                  {medicament.name}
                </Heading>

                <Link to="/">
                  <Text>Создать напоминание</Text>
                </Link>
              </Pane>

              <Paragraph marginTop={20}>
                {`${medicament.manufacturer.name}, ${medicament.manufacturer.country}`}
              </Paragraph>

              <Badge marginTop={4} color="blue">
                {medicament.releaseForm.name}
              </Badge>

              <Paragraph size={300} marginTop={20}>
                {medicament.category.name}
              </Paragraph>

              <Paragraph size={300}>
                Действующее вещество:{" "}
                <Text size={300} fontWeight="bold">
                  {medicament.activeSubstance}
                </Text>
              </Paragraph>
            </Pane>
          </Pane>

          <Heading size={800} marginBottom={16}>
            Наличие в аптеках
          </Heading>

          {availabilities ? (
            <Table>
              <Table.Head paddingRight={0}>
                <Table.TextHeaderCell>Аптека</Table.TextHeaderCell>
                <Table.TextHeaderCell flex={2}>Адрес</Table.TextHeaderCell>
                <Table.TextHeaderCell>Количество</Table.TextHeaderCell>
                <Table.TextHeaderCell>Цена</Table.TextHeaderCell>
              </Table.Head>

              <Table.Body>
                {availabilities.map((a, index) => (
                  <Table.Row key={index}>
                    <Table.TextCell>
                      <a href={a.pharmacyAddress.pharmacy.site}>
                        {a.pharmacyAddress.pharmacy.name}
                      </a>
                    </Table.TextCell>

                    <Table.TextCell flex={2}>
                      {a.pharmacyAddress.address}
                    </Table.TextCell>

                    <Table.TextCell>{a.medicamentCount.count}</Table.TextCell>

                    <Table.TextCell isNumber>{a.price} ₽</Table.TextCell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : (
            <Pane display="flex" justifyContent="center" marginTop={80}>
              <Spinner />
            </Pane>
          )}
        </Pane>
      ) : (
        <Pane
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner />
        </Pane>
      )}
    </Pane>
  );
};

export default MedicinePage;
