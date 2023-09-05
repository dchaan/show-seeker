import styles from "./IndexContainer.module.css"

const IndexContainer = ({ items }) => {
  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.id} - {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndexContainer