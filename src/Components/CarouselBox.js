import React, { Component } from "react";
import { Carousel } from "react-bootstrap";
import video1 from "../assets/video1.mp4"; // Імпорт відео
import video2 from "../assets/video2.mp4";
import video3 from "../assets/video3.mp4";
import video4 from "../assets/video4.mp4";
import video5 from "../assets/video5.mp4";
import "./CarouselBox.css"; // Імпорт CSS файлу

const quotes = [
  {
    text: "Вчитися читати книгу, думати над прочитаним - велика і благородна мета.",
    author: "Й. Гете",
    video: video1,
  },
  {
    text: "Тільки книжки перетворять подив у допитливість. Тільки читання відкриває перед людиною розкіш інтелектуального життя.",
    author: "В. О. Сухомлинський",
    video: video2,
  },
  {
    text: "Література — це храм, куди можна ввійти лиш з чистою совістю і благородними намірами.",
    author: "Ф. Шиллер",
    video: video3,
  },
  {
    text: "Одні книги вчать нас жити, інші - прикрашають наш побут.",
    author: "М. Генін",
    video: video4,
  },
  {
    text: "Коли книга подобається з роками все більше - це вірна ознака, що вона хороша.",
    author: "Г. Ліхтенберг",
    video: video5,
  },
];

export default class CarouselBox extends Component {
  render() {
    return (
      <Carousel>
        {quotes.map((quote, index) => (
          <Carousel.Item key={index}>
            <video
              className="d-block w-100 carousel-video" // Додано клас для стилізації
              src={quote.video}
              autoPlay // Автовідтворення
              loop // Зациклювання
              muted // Вимкнено звук
              playsInline // Підтримка автовідтворення на мобільних пристроях
            />
            <Carousel.Caption>
              <h3>{quote.text}</h3>
              <p>— {quote.author}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }
}
