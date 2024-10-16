const openWikiItems = () => {
  window.open('https://wiki.melvoridle.com/w/Table_of_Items', '_blank').focus();
}

const addItemFromSettings = () => {
  const { settings } = mod.getContext(import.meta);
  const generalSettings = settings.section('General');
  const itemID = generalSettings.get('item-id').trim();
  const itemQuantity = generalSettings.get('item-quantity');
  
  const item = game.items.getObjectByID(itemID);
  if (item === undefined) {
    game.combat.notifications.add({type:'Player',args:[game.attack,'Failed to find item','danger']});
  } else {
    game.bank.addItemByID(itemID, itemQuantity, false, true);
  }
};

const addSlayerCoins = () => {
  const { settings } = mod.getContext(import.meta);
  const generalSettings = settings.section('General');
  const slayerCoins = generalSettings.get('slayer-coins');
  game.slayerCoins.add(slayerCoins)
}

const addGP = () => {
  const { settings } = mod.getContext(import.meta);
  const generalSettings = settings.section('General');
  const gpAmount = generalSettings.get('gp-amount');
  game.gp.add(gpAmount)
}

export async function setup(ctx) {

  const generalSettings = ctx.settings.section('General');
  generalSettings.add({
    type: 'button',
    display: 'Find Item IDs',
    name: 'open-wiki-items',
    onClick: () => openWikiItems()
  });

  generalSettings.add({
    type: 'text',
    name: 'item-id',
    label: 'Item ID',
    hint: 'Item IDs are on the Wiki, and are CASE SENSITIVE. For exmaple, Normal Logs are \"melvorD:Normal_Logs\"'
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
    display: 'Add Items',
    name: 'item-add-button',
    onClick: () => addItemFromSettings()
  });

  generalSettings.add({
    type: 'number',
    name: 'gp-amount',
    label: 'GP',
    default: 0,
    min: 0
  });

  generalSettings.add({
    type: 'button',
    display: 'Add GP',
    name: 'gp-add-button',
    onClick: () => addGP()
  });

  generalSettings.add({
    type: 'number',
    name: 'slayer-coins',
    label: 'Slayer Coins',
    default: 0,
    min: 0
  });

  generalSettings.add({
    type: 'button',
    display: 'Add Slayer Coins',
    name: 'slayer-add-button',
    onClick: () => addSlayerCoins()
  });

  //await ctx.loadScript('scripts/additem.js');
  /*
  sidebar.category('Modding').item('Add Items', {
    icon: ctx.getResourceUrl('icon.png'),
    onClick: () => addItemFromSettings()
  });
  */
}