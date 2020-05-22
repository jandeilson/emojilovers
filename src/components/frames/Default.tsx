import * as React from "react";

import { FormName } from "./lovers/FormName";

type Props = {
  loversData: (data: object) => void;
}

export const Default: React.FunctionComponent<Props> = (props) => {

    return <>
    <section className="lovers">
      <div className="container is-fluid has-text-centered">
          <h1>EmojiLovers</h1>
          <FormName loversData={props.loversData} />
      </div>
    </section>
    </>
}