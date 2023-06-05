import React, { Component } from "react";

export class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        {
          key: "all",
          name: "Всі",
        },
        {
          key: "laptops",
          name: "Ноутбуки",
        },
        {
          key: "phones",
          name: "Телефони",
        },
        {
          key: "consoles",
          name: "Приставки",
        },
        {
          key: "monitors",
          name: "Монітори",
        },
      ],
    };
  }
  render() {
    return (
      <div className="categories">
        {this.state.categories.map((el) => (
          <div key={el.key} onClick={() => this.props.chooseCategory(el.key)}>
            {el.name}
          </div>
        ))}
      </div>
    );
  }
}

export default Categories;
