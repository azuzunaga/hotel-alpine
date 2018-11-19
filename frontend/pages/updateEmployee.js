import UpdateEmployee from '../components/UpdateEmployee';

const Update = ({ query }) => (
  <div>
    <UpdateEmployee id={query.id} />
  </div>
);

export default Update;
