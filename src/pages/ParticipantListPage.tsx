import React from 'react';
import Button from '../components/Button';
import CustomContainer from '../components/Container';
import Header from '../components/Header';
import PaginationButtons from '../components/PaginationButtons';
import TableHeader from '../components/TableHeader';
import { db } from '../firebase';
import IParticipant from '../interfaces/participant.interface';

interface IProps {}

interface IState {
  participants: IParticipant[];
  paginatedParticipants: IParticipant[];
  page: number;
  q: string;
}

export class ParticipantListPage extends React.PureComponent<IProps, IState> {
  state = {
    participants: [],
    paginatedParticipants: [],
    page: 1,
    q: '',
  };

  componentDidMount() {
    db.ref('participants')
      .get()
      .then((querySnapshot) => {
        const users: IParticipant[] = [];
        const paginatedUsers: IParticipant[] = [];

        if (querySnapshot.val()) {
          const keys = Object.keys(querySnapshot.val());

          Object.keys(querySnapshot.val()).forEach((user, index) => {
            const userObj = querySnapshot.val()[user];
            userObj.firebaseId = keys[index];
            userObj.indicator = index;
            users.push(userObj);

            if (index < 10) {
              paginatedUsers.push(userObj);
            }
          });

          this.setState({
            participants: [...users],
            paginatedParticipants: [...paginatedUsers],
          });
        }
      });
  }

  onPaginationButtonClick = (val: number, type: string | undefined) => {
    const { participants, page } = this.state;

    if (page === 1 && val < 1) return;
    if (page === 1 && type === 'first') return;
    if (page === Math.ceil(participants.length / 10) && val > page) return;
    if (page === Math.ceil(participants.length / 10) && type === 'last') return;

    let startPoint = val > page ? page * 10 : (page - 2) * 10;
    let endPoint = val > page ? (page + 1) * 10 : (page - 1) * 10;

    if (type === 'first') {
      startPoint = 0;
      endPoint = 10;
    }
    if (type === 'last') {
      startPoint = (Math.ceil(participants.length / 10) - 1) * 10;
      endPoint = Math.ceil(participants.length / 10) * 10;
      // eslint-disable-next-line no-param-reassign
      val = Math.ceil(participants.length / 10);
    }

    const updatedPaginatedParticipants = participants.slice(
      startPoint,
      endPoint,
    );
    this.setState({
      page: val,
      paginatedParticipants: [...updatedPaginatedParticipants],
    });
  };

  onParticipantUpdate = (part: IParticipant) => {
    const { participants } = this.state;
    const updatedParticipants = participants.map((pr: IParticipant) => {
      if (pr.id === part.id) {
        // eslint-disable-next-line no-param-reassign
        pr.isAttended = true;
      }
      return pr;
    });

    db.ref(`participants/${part.firebaseId}`)
      .update({
        isAttended: true,
      })
      .then(() => {
        this.setState({ participants: [...updatedParticipants] });
      });
  };

  onSearchQueryChange = (event: { target: { value: string } }) => {
    const q = event.target.value.toLowerCase();
    this.setState({ q }, () => this.filterList());
  };

  filterList = () => {
    const { participants } = this.state;
    const { q } = this.state;

    const filteredParticipants =
      participants &&
      participants.filter((part: IParticipant) => {
        return part.fullName.toLowerCase().indexOf(q) !== -1;
      });

    if (q === '') {
      const paginatedParticipants: IParticipant[] = [];
      participants.forEach((part: IParticipant, index) => {
        if (index < 10) {
          paginatedParticipants.push(part);
        }
      });
      return this.setState({ paginatedParticipants, page: 1 });
    }

    return this.setState({ paginatedParticipants: filteredParticipants });
  };

  render() {
    const { participants, paginatedParticipants, page, q } = this.state;
    return (
      <CustomContainer maxWidth={1000}>
        <>
          <Header name="Register" path="/form" />
          <h1 className="my-3 font-weight-bold">Participant List</h1>
          {participants.length ? (
            <>
              <input
                className="form-control"
                value={q}
                placeholder="Search by fullname"
                onChange={this.onSearchQueryChange}
                style={{ marginTop: 10 }}
              />
              <table className="table table-hover bg-white shadow-lg p-3 my-3 bg-white rounded">
                <thead>
                  <tr>
                    <TableHeader
                      headers={['#', 'Fullname', 'Email', 'HES Code', 'Status']}
                    />
                  </tr>
                </thead>
                <tbody>
                  {paginatedParticipants.map((part: IParticipant) => {
                    return (
                      <tr key={part.id}>
                        <th>{part.indicator}</th>
                        <td>{part.fullName}</td>
                        <td>{part.email}</td>
                        <td>{part.hesCode}</td>
                        <td>
                          {part.isAttended ? (
                            <span
                              className="text-success"
                              style={{ fontSize: 14 }}
                            >
                              Checked-In
                            </span>
                          ) : (
                            <Button
                              name="Check-In"
                              className="btn btn-outline-warning btn-sm"
                              onClick={() => this.onParticipantUpdate(part)}
                            />
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div style={{ textAlign: 'right' }}>
                <PaginationButtons
                  page={page}
                  onClick={(val, type) =>
                    this.onPaginationButtonClick(val, type)
                  }
                  numberOfPages={Math.ceil(participants.length / 10)}
                />
              </div>
            </>
          ) : (
            <span>No data</span>
          )}
        </>
      </CustomContainer>
    );
  }
}
