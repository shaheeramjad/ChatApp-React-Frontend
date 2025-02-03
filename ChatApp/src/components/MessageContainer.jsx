const MessageContainer = ({ messages }) => {
  return (
    <div>
      <table>
        <tbody>
          {messages.map((msg, index) => (
            <tr key={index}>
              <td>
                {msg.msg} - {msg.userName}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MessageContainer;
