import {
  Heading,
  ListItem,
  OrderedList,
  Pane,
  Paragraph,
  UnorderedList,
} from "evergreen-ui";
import Header from "../components/Header";

import img1 from "../../images/1.jpg";
import img2 from "../../images/2.jpg";
import img3 from "../../images/3.jpg";
import img4 from "../../images/4.jpg";
import img5 from "../../images/5.jpg";
import img6 from "../../images/6.jpg";
import img7 from "../../images/7.jpg";

const HelpPage = () => {
  return (
    <Pane className="page">
      <Header type="reminders" />

      <Pane className="container">
        <Heading size={700} marginBottom={20}>
          Содержание
        </Heading>
        <OrderedList>
          <ListItem>
            <a href="#p1">Назначение системы</a>
          </ListItem>
          <ListItem>
            <a href="#p2">Условия работы системы</a>
          </ListItem>
          <ListItem>
            <a href="#p3">Установка системы</a>
          </ListItem>
          <ListItem>
            <a href="#p4">Работа с системой</a>

            <OrderedList>
              <ListItem>
                <a href="#p5">Вход в систему (авторизация)</a>
              </ListItem>
              <ListItem>
                <a href="#p6">Вход в систему (регистрация)</a>
              </ListItem>
              <ListItem>
                <a href="#p7">Поиск лекарств</a>
              </ListItem>
              <ListItem>
                <a href="#p8">Просмотр наличия лекарства в аптеках</a>
              </ListItem>
              <ListItem>
                <a href="#p9">Работа с напоминаниями</a>
              </ListItem>
            </OrderedList>
          </ListItem>
        </OrderedList>

        <Heading id="p1" size={700} marginTop={32} marginBottom={20}>
          Назначение системы
        </Heading>
        <Paragraph>
          Система предназначена для поиска лекарств по их наличию в аптеках.
          Также в системе есть возможность создания напоминаний о приеме.
        </Paragraph>

        <Heading id="p2" size={700} marginTop={32} marginBottom={20}>
          Условия работы системы
        </Heading>
        <Paragraph>
          Для корректного функционирования серверной части системы необходимо:
        </Paragraph>
        <UnorderedList>
          <ListItem>тип ЭВМ: x86-64 совместимый;</ListItem>
          <ListItem>объем ОЗУ – не менее 4 Гб;</ListItem>
          <ListItem>
            объем свободного дискового пространства – не менее 25 Гб;
          </ListItem>
          <ListItem>клавиатура или иное устройство ввода;</ListItem>
          <ListItem>мышь или иное манипулирующее устройство;</ListItem>
          <ListItem>процессор – Intel Pentium не менее 1,5 ГГц;</ListItem>
          <ListItem>
            дисплей с разрешением не менее 1024 × 768 пикселей;
          </ListItem>
          <ListItem>операционная система Windows 7 и выше;</ListItem>
          <ListItem>PostgreSQL 11 и выше.</ListItem>
        </UnorderedList>
        <Paragraph>
          Для корректного функционирования клиентской части системы необходимо:
        </Paragraph>
        <UnorderedList>
          <ListItem>тип ЭВМ: x86-64 совместимый;</ListItem>
          <ListItem> объем ОЗУ – не менее 4 Гб;</ListItem>
          <ListItem>
            объем свободного дискового пространства – не менее 50 Гб;
          </ListItem>
          <ListItem>клавиатура или иное устройство ввода;</ListItem>
          <ListItem>мышь или иное манипулирующее устройство;</ListItem>
          <ListItem>процессор – Intel Core i3 не менее 1,5 ГГц;</ListItem>
          <ListItem>
            дисплей с разрешением не менее 1024 × 768 пикселей;
          </ListItem>
          <ListItem>операционная система Windows 7 и выше;</ListItem>
          <ListItem>
            браузер – Google Chrome 86.0.4240.183 (64-битный) и выше, Яндекс
          </ListItem>
          <ListItem> Браузер 21.2.1.108 (64-битный) и выше.</ListItem>
        </UnorderedList>

        <Heading id="p3" size={700} marginTop={32} marginBottom={20}>
          Установка системы
        </Heading>
        <Paragraph>
          Система поставляется в виде war-архива. Данный файл необходимо
          распаковать в любую директорию на жестком диске. Кроме того,
          необходимо установить PostgreSQL и создать пустую БД, задав логин и
          пароль. После этого можно открыть систему в IntelliJ IDEA и
          отредактировать файл application.properties в соответствии с логином,
          паролем и ссылкой на БД. После этого система может быть запущена с
          помощью кнопки запуска. Сама система станет доступна в браузере по
          адресу http:/localhost:PORT/.
        </Paragraph>

        <Heading id="p4" size={700} marginTop={32} marginBottom={20}>
          Работа с системой
        </Heading>

        <Heading id="p5" size={600} marginTop={24} marginBottom={12}>
          Вход в систему (авторизация)
        </Heading>
        <Paragraph>
          Для того, чтобы авторизоваться в системе, необходимо запустить
          приложение, после чего откроется страница авторизации. Здесь нужно
          ввести логин и пароль, затем нажать кнопку «Войти». При успешной
          авторизации произойдет переход на страницу ввода параметров поиска по
          лекарствам, после чего система будет ожидать действий пользователя.
        </Paragraph>
        <Pane padding={20}>
          <img src={img1} width="100%" />
        </Pane>

        <Heading id="p6" size={600} marginTop={24} marginBottom={12}>
          Вход в систему (регистрация)
        </Heading>
        <Paragraph>
          Для регистрации в системе необходимо на странице авторизации нажать на
          кнопку «Зарегистрироваться». После этого откроется страница для ввода
          данных для регистрации – логина, пароля и электронной почты. После
          ввода параметров необходимо нажать на кнопку «Зарегистрироваться». В
          случае успешной регистрации произойдет переход на страницу ввода
          параметров поиска, а введенные данные будут доступны при авторизации.
        </Paragraph>
        <Pane padding={20}>
          <img src={img2} width="100%" />
        </Pane>

        <Heading id="p7" size={600} marginTop={24} marginBottom={12}>
          Поиск лекарств
        </Heading>
        <Paragraph>
          Для того, чтобы осуществить поиск лекарств, необходимо ввести как
          минимум один параметр для поиска. Также доступен поиск по нескольким
          параметрам и по части параметра. Система поддерживает
          регистронезависимый поиск и поиск по части слова.
        </Paragraph>
        <Paragraph>
          После ввода необходимых параметров и нажатия кнопки «Поиск» происходит
          переход на страницу результатов поиска. Лекарства выводятся в виде
          таблицы с указанием количества аптек, в которых присутствует в наличии
          данное лекарство и минимальной цены по всем аптекам.
        </Paragraph>
        <Pane padding={20}>
          <img src={img3} width="100%" />
        </Pane>
        <Paragraph>
          Также на карточке лекарства указывается его название, производитель и
          форма выпуска.
        </Paragraph>
        <Pane padding={20}>
          <img src={img4} width="100%" />
        </Pane>

        <Heading id="p8" size={600} marginTop={24} marginBottom={12}>
          Просмотр наличия лекарства в аптеках
        </Heading>
        <Paragraph>
          При нажатии на карточку лекарства система осуществляет переход на
          страницу с подробной информацией о лекарстве. Также на данной странице
          доступна информация о наличии лекарства в аптеках, представленная в
          виде таблицы. В ней выводится информация об адресе аптеки,
          определенного количества и дозировки лекарства и его цена в конкретной
          аптеке. При нажатии кнопки «Создать напоминание» открывается форма для
          создания напоминания о приеме выбранного лекарства.
        </Paragraph>
        <Pane padding={20}>
          <img src={img5} width="100%" />
        </Pane>

        <Heading id="p9" size={600} marginTop={24} marginBottom={12}>
          Работа с напоминаниями
        </Heading>
        <Paragraph>
          При нажатии на кнопку «Мои напоминания» происходит переход на страницу
          управления напоминаниями. Напоминания можно создавать и удалять.
          Напоминание содержит в себе информацию о названии лекарства,
          дозировке, времени приема, дате начала и окончания курса приема.
        </Paragraph>
        <Paragraph>
          Для создания напоминания необходимо ввести все параметры и нажать
          кнопку «Создать». В случае перехода на эту форму со страницы просмотра
          информации о лекарстве, название лекарства заполняется автоматически.
        </Paragraph>
        <Pane padding={20}>
          <img src={img6} width="100%" />
        </Pane>
        <Pane padding={20}>
          <img src={img7} width="100%" />
        </Pane>
      </Pane>
    </Pane>
  );
};

export default HelpPage;
