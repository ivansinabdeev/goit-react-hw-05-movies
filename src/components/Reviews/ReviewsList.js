import PropTypes from "prop-types";
import ShowMoreText from "react-show-more-text";

export default function ReviewsList({ reviewsData }) {
  return (
    <ul className="list">
      {reviewsData.map(({ id, author, content }) => (
        <li key={id}>
          <span>{author}</span>
          <ShowMoreText
            lines={5}
            more="Show more"
            less="Show less"
            expanded={false}
            truncatedEndingComponent={"... "}
          >
            <p>{content}</p>
          </ShowMoreText>
        </li>
      ))}
    </ul>
  );
}

ReviewsList.propTypes = {
  castData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.string,
      content: PropTypes.string,
    })
  ),
};
