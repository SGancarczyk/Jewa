import React, { useState } from 'react';
import './ContentArea.css';
import ProblemSelector from "./ProblemSelector/ProblemSelector";

const Elements = [
  { name: "Wybierz Pytanie", description: ""},
  { name: "Lorem Ipsum.", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec elementum vestibulum tempor. In quis augue ut lectus efficitur dictum et ac dolor. Nulla facilisi. Nunc quis bibendum velit, eu lacinia turpis. Nunc in condimentum lacus. Nunc sed sem suscipit, fringilla metus in, tincidunt leo. Ut tristique elit odio, sed venenatis lorem mollis vitae. Vestibulum ac diam eu ipsum blandit interdum ut nec libero. Morbi fringilla dapibus turpis. Nulla eu sapien id libero suscipit pellentesque sit amet vestibulum neque. Mauris at urna odio. Sed bibendum odio non mauris pulvinar mollis. Duis ullamcorper accumsan ex, non dapibus ipsum auctor vel. Pellentesque rutrum dui quis arcu malesuada sollicitudin. Nullam eget consectetur arcu, ac malesuada velit. Mauris aliquam vulputate leo a molestie. Proin venenatis convallis nunc et feugiat. Nullam maximus scelerisque luctus. Sed blandit purus sit amet ipsum egestas, vel tempus felis aliquam. Nunc faucibus massa non quam egestas, vitae venenatis ex mollis. Cras id nibh id nisl tincidunt consequat. Vestibulum rutrum laoreet nunc sit amet dapibus. Aliquam et urna nunc. Pellentesque ullamcorper urna id urna posuere aliquam. Morbi posuere sollicitudin urna quis tempus. Sed cursus egestas ultrices. Nullam quis felis eget dolor faucibus convallis nec non turpis. Vestibulum velit nulla, efficitur eget lacus.",  pdfUrl: "/documents/instrukcje/lorem-ipsum.pdf"}
];

function ContentArea() {

    return (
        <div className="content-area">
            <h2>Często zadawane pytania:</h2>
            <p><ProblemSelector items={Elements} /></p>
            <h2>Jeśli twój problem nie pokrywa się z listą problemów, skontaktuj się z obsługą klienta:</h2>
            <button className="standard-button" onClick={() => window.location.href = '/clientservice'}>
                Obsługa Klienta
            </button>

        </div>
    );
}

export default ContentArea;
