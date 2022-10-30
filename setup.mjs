const addItemFromSettings = () => {
  const { settings } = mod.getContext(import.meta);
  const generalSettings = settings.section('General');
  const itemID = generalSettings.get('item-id');
  const itemQuantity = generalSettings.get('item-quantity');
  
  const item = game.items.getObjectByID(itemID);
  if (item === undefined) {
    game.combat.notifications.add({type:'Player',args:[game.attack,'Failed to find item','danger']});
  } else {
    game.bank.addItemByID(itemID, itemQuantity, false, true);
  }
};

export async function setup(ctx) {

  const generalSettings = ctx.settings.section('General');
  generalSettings.add({
    type: 'text',
    name: 'item-id',
    label: 'Item ID',
    hint: 'Item IDs are on the Wiki.'
  });

  generalSettings.add({
    type: 'number',
    name: 'item-quantity',
    label: 'Item Quantity',
    default: 1,
    min: 0
  });

  generalSettings.add({
    type: 'button',
    display: 'Add',
    name: 'item-add-button',
    onClick: () => addItemFromSettings()
  });

  //await ctx.loadScript('scripts/additem.js');
  /*
  sidebar.category('Modding').item('Add Items', {
    icon: ctx.getResourceUrl('icon.png'),
    onClick: () => addItemFromSettings()
  });
  */
}