import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

//Services
import vacationsSer from "../services/vacations.service.js";

//Context
import { UserContext } from "./UserContext";

// bootstrap
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// material
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";

// react share
import {
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  WhatsappShareButton,
  EmailShareButton,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

const VacationCard = ({ vacationDetails }) => {
  const navigate = useNavigate();

  const {
    userId,
    getAllVacations,
    vacations,
    getFollowedVacationsOfUser,
    setFollowedVacationsOfUser,
    followedVacationsOfUser,
  } = useContext(UserContext);

  const [likeStatus, setLikeStatus] = useState(false);

  const addFollowedVacation = (
    currentVacationId,
    currentUserId,
    vacationFollowersList
  ) => {
    // console.log(likeStatus,currentVacationId,currentUserId,vacationFollowersList );
    vacationsSer
      .addFollowToVacation(
        likeStatus,
        currentVacationId,
        currentUserId,
        vacationFollowersList
      )
      .then((res) => {
        // console.log(res);
        setLikeStatus(!likeStatus);
        getAllVacations();
        getFollowedVacationsOfUser(currentUserId);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    !vacationDetails.followersList.includes(userId)
      ? setLikeStatus(false)
      : setLikeStatus(true);
  });

  const shareurl = `${window.location}/${vacationDetails.destination}`;

  return (
    <div>
      <Card key={vacationDetails._id}>
        <Card.Img
          className="cardImg"
          variant="top"
          src={vacationDetails.image}
          alt={vacationDetails.destination}
        />
        <Card.Body>
          <Row className="cardHead">
            <Col xs={8}>
              <Card.Title className="desTitle">
                {vacationDetails.destination}
              </Card.Title>
              <Card.Text>
                {vacationDetails.startDate}-{vacationDetails.endDate}
              </Card.Text>
            </Col>
            <Col xs={4}>
              <Card.Title className="desTitle">Price:</Card.Title>
              <Card.Text>{vacationDetails.price}₪</Card.Text>
            </Col>
          </Row>
          <Card.Text className="desc">{vacationDetails.description}</Card.Text>
          <div className="likesShow">
            {!likeStatus ? (
              <FavoriteBorderRoundedIcon
                className="likeButton"
                cursor="pointer"
                onClick={() =>
                  addFollowedVacation(
                    vacationDetails._id,
                    userId,
                    vacationDetails.followersList
                  )
                }
              />
            ) : (
              <FavoriteRoundedIcon
                className="likeButton"
                cursor="pointer"
                onClick={() =>
                  addFollowedVacation(
                    vacationDetails._id,
                    userId,
                    vacationDetails.followersList
                  )
                }
              />
            )}
            {vacationDetails.followersList.length > 0 ? (
              <Card.Text className="likesCounter">
                {vacationDetails.followersList.length} {""}people like this!
              </Card.Text>
            ) : (
              <Card.Text className="likesCounter">
                {""}Be the first to like it!
              </Card.Text>
            )}
          </div>
          <div className="actionButton">
            <Button variant="primary">
              <Link to={vacationDetails.destination}>Read More</Link>
            </Button>{" "}
            {""}
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
        </Card.Body>
      </Card>
    </div>
  );
};

export default VacationCard;
