document.addEventListener("DOMContentLoaded", () => {
  // ===== Данные меню с правильными путями =====
  const menuData = {
    salads: [
      { name: "Цезарь", img: "salad-caesar.png" },
      { name: "Студенческий", img: "salad-student.png" },
      { name: "Салат капуста с огурцом", img: "salad-cabbage-cucumber.png" },
      { name: "Салат гнездо глухаря", img: "salad-grouse-nest.png" },
      { name: "Обжорка", img: "salad-obzhorka.png" },
      { name: "Свекла с сыром", img: "salad-beet-cheese.png" },
      { name: "Свекла с чесноком", img: "salad-beet-garlic.png" },
      { name: "Пекинский", img: "salad-peking.png" },
      { name: "Рулет с ветчиной и сыром", img: "salad-ham-cheese-roll.png" },
      { name: "Салат баварский", img: "salad-bavarian.png" },
      { name: "Салат с дайконом и морковью", img: "salad-daikon-carrot.png" },
      { name: "Салат охотничий", img: "salad-hunter.png" },
      {
        name: "Морковь с чесноком и сметаной",
        img: "salad-carrot-garlic-sourcream.png",
      },
    ],
    first: [
      { name: "Суп с фрикадельками", img: "soup-meatball.png" },
      { name: "Суп грибной классический", img: "soup-mushroom-classic.png" },
      { name: "Бульон куриный с лапшой", img: "soup-chicken-noodle-broth.png" },
      { name: "Суп гуляш венгерский", img: "soup-hungarian-goulash.png" },
      { name: "Сырный суп", img: "soup-cheese.png" },
      { name: "Борщ", img: "soup-borscht.png" },
      { name: "Харчо", img: "soup-kharcho.png" },
      { name: "Суп итальянский", img: "soup-italian.png" },
      { name: "Суп гороховый", img: "soup-pea.png" },
      { name: "Солянка", img: "soup-solyanka.png" },
    ],
    second: [
      {
        name: "Курица по-французски с картофелем",
        img: "main-chicken-french-potato.png",
      },
      {
        name: "Курица по-албански с картофелем",
        img: "main-chicken-albanian-potato.png",
      },
      {
        name: "Лапша удон со свининой в азиатском стиле",
        img: "main-pork-udon-asian.png",
      },
      {
        name: "Стейк куриный с ветчиной и сыром",
        img: "main-chicken-steak-ham-cheese.png",
      },
      {
        name: "Бифштекс с картофельным пюре",
        img: "main-beefsteak-mashed-potato.png",
      },
      { name: "Паста болоньезе", img: "main-pasta-bolognese.png" },
      {
        name: "Картофель жареный с котлетой",
        img: "main-fried-potato-cutlet.png",
      },
      {
        name: "Запечённое филе бедра куриное с картофелем",
        img: "main-baked-chicken-thigh-potato.png",
      },
      {
        name: "Свиной гуляш с макаронами",
        img: "main-pork-goulash-macaroni.png",
      },
      { name: "Удон с курицей", img: "main-chicken-udon.png" },
      { name: "Гратен с курицей", img: "main-chicken-gratin.png" },
      { name: "Булгур со свининой", img: "main-bulgur-pork.png" },
      { name: "Паста с фрикадельками", img: "main-pasta-meatballs.png" },
      {
        name: "Гречка по-купечески с курицей",
        img: "main-buckwheat-merchant-chicken.png",
      },
      { name: "Плов с курицей", img: "main-chicken-pilaf.png" },
    ],
  };

  // ===== Получаем контейнеры =====
  const saladContainer = document.getElementById("salad-inputs");
  const firstContainer = document.getElementById("first-inputs");
  const secondContainer = document.getElementById("second-inputs");

  // ===== Кнопки добавления =====
  const addSaladBtn = document.getElementById("add-salad");
  const addFirstBtn = document.getElementById("add-first");
  const addSecondBtn = document.getElementById("add-second");

  const MAX_SELECTS = 5;

  // ===== Функция для получения доступных блюд =====
  function getAvailableItems(container, allItems) {
    const selectedItems = new Set();
    const selects = container.querySelectorAll(".menu-select");

    selects.forEach((select) => {
      const selectedOption = select.options[select.selectedIndex];
      if (selectedOption && selectedOption.value) {
        selectedItems.add(selectedOption.value);
      }
    });

    return allItems.filter((item) => !selectedItems.has(item.name));
  }

  // ===== Создание селекта с обновленными опциями =====
  function createSelectWithOptions(items, placeholder = "Выберите блюдо") {
    const select = document.createElement("select");
    select.className = "menu-select";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = placeholder;
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    items.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.name;
      option.textContent = item.name;
      option.dataset.img = item.img;
      select.appendChild(option);
    });

    return select;
  }

  // ===== Обновление всех селектов в категории =====
  function updateSelectsInContainer(container, allItems) {
    const selects = container.querySelectorAll(".menu-select");
    const currentValues = [];

    selects.forEach((select) => {
      const selectedOption = select.options[select.selectedIndex];
      if (selectedOption && selectedOption.value) {
        currentValues.push(selectedOption.value);
      }
    });

    const availableItems = getAvailableItems(container, allItems);

    selects.forEach((select, index) => {
      const currentValue = currentValues[index] || "";

      select.innerHTML = "";

      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "Выберите блюдо";
      defaultOption.disabled = true;
      if (!currentValue) {
        defaultOption.selected = true;
      }
      select.appendChild(defaultOption);

      const itemsToShow = [...availableItems];
      if (currentValue) {
        const currentItem = allItems.find((item) => item.name === currentValue);
        if (
          currentItem &&
          !itemsToShow.find((item) => item.name === currentValue)
        ) {
          itemsToShow.push(currentItem);
        }
      }

      itemsToShow.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.name;
        option.textContent = item.name;
        option.dataset.img = item.img;
        if (item.name === currentValue) {
          option.selected = true;
        }
        select.appendChild(option);
      });
    });
  }

  // ===== Добавление нового селекта =====
  function addSelectToContainer(container, allItems, maxCount) {
    const currentSelects = container.querySelectorAll(".menu-select");
    if (currentSelects.length >= maxCount) {
      alert(`Максимум ${maxCount} позиций в категории!`);
      return;
    }

    const availableItems = getAvailableItems(container, allItems);
    const newSelect = createSelectWithOptions(availableItems);
    container.appendChild(newSelect);

    updateSelectsInContainer(container, allItems);

    newSelect.scrollIntoView({ behavior: "smooth", block: "center" });

    newSelect.addEventListener("change", () => {
      updateSelectsInContainer(container, allItems);
    });
  }

  // ===== Инициализация =====
  function initializeSelects() {
    const containers = [
      { container: saladContainer, data: menuData.salads },
      { container: firstContainer, data: menuData.first },
      { container: secondContainer, data: menuData.second },
    ];

    containers.forEach(({ container, data }) => {
      for (let i = 0; i < 2; i++) {
        const availableItems = getAvailableItems(container, data);
        const select = createSelectWithOptions(availableItems);
        container.appendChild(select);

        select.addEventListener("change", () => {
          updateSelectsInContainer(container, data);
        });
      }
    });
  }

  initializeSelects();

  // ===== Обработчики добавления =====
  addSaladBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addSelectToContainer(saladContainer, menuData.salads, MAX_SELECTS);
  });

  addFirstBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addSelectToContainer(firstContainer, menuData.first, MAX_SELECTS);
  });

  addSecondBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addSelectToContainer(secondContainer, menuData.second, MAX_SELECTS);
  });

  // ===== Модальное окно (компактная версия) =====
  function createModal() {
    const modal = document.createElement("div");
    modal.className = "modal-overlay";
    modal.id = "result-modal";

    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2>Ваш выбор</h2>
          <button class="modal-close" id="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="modal-item">
            <span class="modal-item-label">🥗</span>
            <span class="modal-item-value" id="modal-salad">-</span>
            <div class="modal-image-wrapper">
              <img src="" alt="" class="modal-image" id="modal-salad-img" />
            </div>
          </div>
          <div class="modal-item">
            <span class="modal-item-label">🍲</span>
            <span class="modal-item-value" id="modal-first">-</span>
            <div class="modal-image-wrapper">
              <img src="" alt="" class="modal-image" id="modal-first-img" />
            </div>
          </div>
          <div class="modal-item">
            <span class="modal-item-label">🍖</span>
            <span class="modal-item-value" id="modal-second">-</span>
            <div class="modal-image-wrapper">
              <img src="" alt="" class="modal-image" id="modal-second-img" />
            </div>
          </div>
        </div>
        <button class="modal-btn" id="modal-close-btn">Отлично!</button>
      </div>
    `;

    document.body.appendChild(modal);

    const closeModal = () => {
      modal.classList.remove("active");
    };

    modal.querySelector("#modal-close").addEventListener("click", closeModal);
    modal
      .querySelector("#modal-close-btn")
      .addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
      }
    });

    return modal;
  }

  const modal = createModal();

  // ===== Функция для показа результатов в модалке =====
  function showResultsInModal(salad, first, second) {
    const modalSalad = document.getElementById("modal-salad");
    const modalFirst = document.getElementById("modal-first");
    const modalSecond = document.getElementById("modal-second");
    const modalSaladImg = document.getElementById("modal-salad-img");
    const modalFirstImg = document.getElementById("modal-first-img");
    const modalSecondImg = document.getElementById("modal-second-img");

    if (salad) {
      modalSalad.textContent = salad.name;
      modalSaladImg.src = `./assets/salats/${salad.img}`;
      modalSaladImg.alt = salad.name;
      modalSaladImg.style.display = "block";
    } else {
      modalSalad.textContent = "Не выбрано";
      modalSaladImg.style.display = "none";
    }

    if (first) {
      modalFirst.textContent = first.name;
      modalFirstImg.src = `./assets/first/${first.img}`;
      modalFirstImg.alt = first.name;
      modalFirstImg.style.display = "block";
    } else {
      modalFirst.textContent = "Не выбрано";
      modalFirstImg.style.display = "none";
    }

    if (second) {
      modalSecond.textContent = second.name;
      modalSecondImg.src = `./assets/second/${second.img}`;
      modalSecondImg.alt = second.name;
      modalSecondImg.style.display = "block";
    } else {
      modalSecond.textContent = "Не выбрано";
      modalSecondImg.style.display = "none";
    }

    modal.classList.add("active");
  }

  // ===== Кнопка "Рассчитать" =====
  document.getElementById("calculate").addEventListener("click", (e) => {
    e.preventDefault();

    const saladSelects = saladContainer.querySelectorAll(".menu-select");
    const firstSelects = firstContainer.querySelectorAll(".menu-select");
    const secondSelects = secondContainer.querySelectorAll(".menu-select");

    function getSelectedItems(selects, dataArray) {
      const selected = [];
      selects.forEach((select) => {
        const selectedOption = select.options[select.selectedIndex];
        if (selectedOption && selectedOption.value) {
          const name = selectedOption.value;
          const fullItem = dataArray.find((item) => item.name === name);
          if (fullItem) {
            selected.push(fullItem);
          }
        }
      });
      return selected;
    }

    const selectedSalads = getSelectedItems(saladSelects, menuData.salads);
    const selectedFirst = getSelectedItems(firstSelects, menuData.first);
    const selectedSecond = getSelectedItems(secondSelects, menuData.second);

    const errors = [];
    if (selectedSalads.length === 0) errors.push("салат");
    if (selectedFirst.length === 0) errors.push("первое блюдо");
    if (selectedSecond.length === 0) errors.push("второе блюдо");

    if (errors.length > 0) {
      alert(
        `Пожалуйста, выберите хотя бы одно блюдо в категориях: ${errors.join(", ")}`,
      );
      return;
    }

    const randomSalad =
      selectedSalads[Math.floor(Math.random() * selectedSalads.length)];
    const randomFirst =
      selectedFirst[Math.floor(Math.random() * selectedFirst.length)];
    const randomSecond =
      selectedSecond[Math.floor(Math.random() * selectedSecond.length)];

    showResultsInModal(randomSalad, randomFirst, randomSecond);
  });
});
