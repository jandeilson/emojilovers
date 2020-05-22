import * as React from "react";

import { FormName } from "./lovers/FormName";

type Props = {
  userData: any;
  loversData: (data: object) => void;
}

export const Default: React.FunctionComponent<Props> = (props) => {

    return <>
    <section className="lovers">
      <div className="container is-fluid has-text-centered">
          <h1>EmojiLovers</h1>
          <FormName loversData={props.loversData} userData={props.userData} />
      </div>
    </section>
    </>
}