import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

//Services
import connectionSer from "../services/connect.service.js";
import vacationsSer from "../services/vacations.service.js";

// bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// react share
import {
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  WhatsappShareButton,
  EmailShareButton,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

const VacationPage = () => {
  let { destination } = useParams();

  const [currentVacationDest, setCurrentVacationDest] = useState();
  const [shownVacation, setShownVacation] = useState();
  const shareurl = `${window.location}`;

  useEffect(() => {
    // console.log(destination);
    setCurrentVacationDest(destination);
    // console.log(currentVacationDest);
    vacationsSer
      .getSingleVacations(destination)
      .then((res) => {
        // console.log(res.data);
        setShownVacation(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div></div>
      <Row>
        {shownVacation && (
          <Col>
            <h1>{shownVacation.destination} </h1>
            <h4>
              <span className="detailTitle">Dates: </span>
              {shownVacation.startDate} - {shownVacation.endDate} |{" "}
              <span className="detailTitle">Price: </span>
              {shownVacation.price}₪
            </h4>

            <img className="vacationPageImg" src={shownVacation.image}></img>

            <h4 className="vacationDesc">
              Adventure following <strong>{shownVacation.description}.</strong>
            </h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </Col>
        )}
        <div className="actionButton">
          {/* whatsapp share */}
          <div className="Demo__some-network">
            <WhatsappShareButton
              url={shareurl}
              title="Look this Vacation"
              separator=": "
              className="Demo__some-network__share-button"
            >
              <WhatsappIcon size={32} />
            </WhatsappShareButton>
          </div>
          {/* facebook messenger share */}
          <div className="Demo__some-network">
            <FacebookMessengerShareButton
              url={shareurl}
              appId="521270401588372"
              className="Demo__some-network__share-button"
            >
              <FacebookMessengerIcon size={32} />
            </FacebookMessengerShareButton>
          </div>
          {/* email share */}
          <div className="Demo__some-network">
            <EmailShareButton
              url={shareurl}
              subject="Look this Vacation"
              body="body"
              className="Demo__some-network__share-button"
            >
              <EmailIcon className="emailIcon" size={32} />
            </EmailShareButton>
          </div>
        </div>
      </Row>
    </>
  );
};

export default VacationPage;
