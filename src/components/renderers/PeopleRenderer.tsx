import * as React from "react";
import Moment from "react-moment";
import IPerson from "../../interfaces/IPerson";

export function PeopleRenderer(props: IPerson) {
  const { firstName, lastName, birthday, eyeColor } = props;
  return (
    <div className="col-12 p-3">
      <div className="card">
        <div className="card-body">
          <h3>
            👤&nbsp;{firstName} {lastName}
          </h3>
          <ul>
            <li>
              Has <b>{eyeColor}</b> eyes
            </li>
            <li>
              🎂&nbsp;&nbsp;Birthday:{" "}
              <b>
                <Moment date={birthday} format="MMMM D, YYYY" />
              </b>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
