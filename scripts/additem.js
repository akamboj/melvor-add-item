mod.register(({ api }) => {
  /**
   * Cached jQuery objects
   */


  const toggleAddItemButton = () => {

  };

  const addItemFromSettings = () => {
    const { settings } = mod.getContext(import.meta);
    const generalSettings = settings.section('General');
    itemID = generalSettings.get('item-id');
    itemQuantity = generalSettings.get('item-quantity');
    
    game.bank.addItemByID(itemID, itemQuantity, false, true);
  };

  
  api({ toggleAddItemButton, addItemFromSettings });
});