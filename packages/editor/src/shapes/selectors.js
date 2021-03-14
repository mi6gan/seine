// @flow
const editRegexp = /(?<action>edit)\((?<mode>box|shape),(?<state>off|on)\)$/;
const moveRegexp = /^(?<action>move)\((?<mode>box|shape),(?<state>off|on)\)$/;
const resizeRegexp = /^(?<action>resize)\((?<mode>box|shape),(?<state>off|on),(.+),(.+),(.+),(.+)\)$/;

export const shapeEditorModeSelector = ({ blocks, selection }) => {
  const { mode = 'edit(box,off)' } =
    (selection.length === 1 &&
      blocks
        .filter((block) => selection.includes(block.id))
        .map(({ editor }) => editor)[0]) ||
    {};
  return (
    mode.match(editRegexp) || mode.match(moveRegexp) || mode.match(resizeRegexp)
  );
};
