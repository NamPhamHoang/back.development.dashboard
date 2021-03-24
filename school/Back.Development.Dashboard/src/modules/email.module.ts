import sgMail from "@sendgrid/mail";
import {css} from "@emotion/core";

sgMail.setApiKey(process.env.SENGRID_KEY);
const text = `
    color: #3A3D42;
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    font-size: 0.7rem;
    font-style: inherit;
`;

const title = `
  text-align: center;
  font-size: 0.95rem;
  font-style: italic;
}`;

const clickme_confirm = `
  border-radius: 4px;
  border: solid 1px #20538D;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.4);
  background: #4479BA;
  color: #FFF;
  padding: 8px 12px;
  text-decoration: none;`;

export const sendEmail = (email, titleEmail, project_name, task_id, task_name, member_name, finish_time, deadline ) => {
  const msg = {
    to: email,
    from: process.env.EMAIL,
    subject: titleEmail,
    html: `<body style="margin: 0 auto; width: 50%;">
    <h2 css = ${title}>{titile}</h2>
    </div>
    <div css = ${text}>
        <div style="display: flex;">
            <p css = ${text} style="width: 20%; word-break: break-all;">Project name</p>
            <p css = ${text} style="width: 50%; word-break: break-all;">${project_name}</p>
        </div>
    </div>
    <div css = ${text}>
        <div style="display: flex;">
            <p css = ${text} style="width: 20%; word-break: break-all;">Task id</p>
            <p css = ${text} style="width: 50%; word-break: break-all;">${task_id}</p>
        </div>
    </div>
    <div css = ${text}>
        <div style="display: flex;">
            <p css = ${text} style="width: 20%; word-break: break-all;">Task name</p>
            <p css = ${text} style="width: 50%; word-break: break-all;">${task_name}</p>
        </div>
    </div>
    <div css = ${text}>
        <div style="display: flex;">
            <p css = ${text} style="width: 20%; word-break: break-all;">Member name</p>
            <p css = ${text} style="width: 50%; word-break: break-all;">${member_name}</p>
        </div>
    </div>
    <div class="text">
        <div style="display: flex;">
            <p css = ${text} style="width: 20%; word-break: break-all;">Finish time</p>
            <p css = ${text} style="width: 50%; word-break: break-all;">${finish_time}</p>
        </div>
    </div>
    <div css = ${text}>
        <div style="display: flex;">
            <p css = ${text} style="width: 20%; word-break: break-all;">Deadline</p>
            <p css = ${text} style="width: 50%; word-break: break-all;">${deadline}</p>
        </div>
    </div>
    <a href="#" css = ${clickme_confirm}>Confirm</a>
</body>`,
  };
  sgMail.send(msg);
};