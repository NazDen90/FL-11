// -	Add new action. If ‘add new action’ input is empty plus button is disabled.
// -	Mark action as done. Marked action can’t be unchecked. (checkbox)
// -	Edit action. When user press ‘edit’ icon, label change to input field where user passed new item name and then press button ‘save’, then item name is change;
// -	Delete action. When user press ‘delete’ icon, item is removed without any confirmation.
// -	Drag & drop action. Each item can be moved up and down through list.
// -	Max item per list is 10.
// -	When list is full, input and plus button are disabled. Under ‘TO DO Cat list’ header, notification ‘Maximum item per list are created’ is displayed.

const UIController = (() => {
    const DOMNodes = {
        addItmBtn: document.querySelector('.addItemBtn'),
        addItmBtnImg: document.querySelector('.addItemBtnImg'),
        addItmInput: document.querySelector('.addItemInput'),
        actionItmList: document.querySelector('.actions'),
        addItemForm: document.querySelector('.addItemForm'),
        deleteItmBtn: document.querySelector('.deleteItemImg'),
        actionItm: document.querySelector('.action')
    };

    const createInput = () => {
        return `  
    <label>
      <input type="text" class="editInput">
      <i class="material-icons saveNameImg">save</i>
    </label>
`;
    };

    return {
        getName() {
            return DOMNodes.addItmInput.value;
        },
        getDomNodes() {
            return DOMNodes;
        },
        checkValue(e, actionLength) {
            const TEN = 10;

            if (e.target.value.length > 0 && actionLength < TEN) {
                DOMNodes.addItmBtn.removeAttribute('disabled');
                DOMNodes.addItmBtnImg.classList.add('active');
            } else {
                DOMNodes.addItmBtn.setAttribute('disabled', 'true');
                DOMNodes.addItmBtnImg.classList.remove('active');
            }
        },
        renderAction(action) {
            const actionItem = `
  <li class="action" id="${action.id}">
    <label class="itemCheckContainer">
      <input type="checkbox" class="itemCheck">
      <span class="checkmark"></span>
    </label>
    <span class="itemText">${action.name}</span>
    <i class="material-icons editNameImg" value="${action.id}">
      edit
    </i>
    <i class="material-icons deleteItemImg" value="${action.id}">
      delete
    </i>
  </li>
            `
            DOMNodes.actionItmList.insertAdjacentHTML('beforeend', actionItem);
        },
        clearInput() {
            DOMNodes.addItmInput.value = '';
            DOMNodes.addItmBtn.setAttribute('disabled', 'true');
            DOMNodes.addItmBtnImg.classList.remove('active');
        },
        addTextMaxItem() {
            const text = `
                <p class="maxItemText">Maximum item per list are created</p>
            `;
            DOMNodes.addItemForm.insertAdjacentHTML('beforebegin', text);
        },
        deleteTextMaxItem() {
            let maxItemText = document.querySelector('.maxItemText');

            if (maxItemText) {
                maxItemText.parentElement.removeChild(maxItemText);
            }
        },
        removeAction(id) {
            let el = document.getElementById(`${id}`);
            if (el) {
                DOMNodes.actionItmList.removeChild(el);
            }
        },
        renderEditField(id) {
            let el = document.getElementById(`${id}`);
            if (el) {
                el.insertAdjacentHTML('afterEnd', createInput());
            }
        }


    }

})();

const ModelController = (() => {
    let state = {
        actions: []
    };
    window.state = state;

    class Action {
        constructor(id, name) {
            this.id = id;
            this.name = name;
        }
    }

    const generateId = () => state.actions.length > 0 ? state.actions[state.actions.length - 1].id + 1 : 1;

    return {
        addAction(name) {
            const TEN = 10;

            if (state.actions.length < TEN) {
                const action = new Action(generateId(), name);
                return state.actions.push(action);
            }
        },
        getActionByIndex(index) {
            return state.actions[index]
        },
        getActionsLength() {
            return state.actions.length;
        },
        editAction(id, descr) {
            let x = state.actions.find(act =>
                act.id === parseInt(id));
            if (x) {
                x.name = descr
            }
        },
        deleteAction(id) {
            state.actions.splice(state.actions.findIndex(act => act.id === id), 1);
        }

    }
})();

const Controller = ((UI, Model) => {
    const setupEventListeners = () => {
        let DomNodes = UI.getDomNodes();
        DomNodes.addItmBtn.addEventListener('click', addItem);
        DomNodes.addItmInput.addEventListener('keyup', (e) => {
            UI.checkValue(e, Model.getActionsLength());
        });
        DomNodes.actionItmList.addEventListener('click', (e) => {
            if (/deleteItemImg/.test(e.target.className)) {
                const id = e.target.attributes.value.value;
                deleteItem(id);
            } else if (/itemCheck/.test(e.target.className)) {
                e.target.disabled = true;
            } else if (/editNameImg/.test(e.target.className)) {
                const id = e.target.attributes.value.value;
                editItem(id)
            }
        });

    };
    const TEN = 10;

    const addItem = () => {
        let arrLength = Model.addAction(UI.getName());
        if (arrLength <= TEN) {
            UI.renderAction(Model.getActionByIndex(arrLength - 1));
        }
        if (arrLength === TEN) {
            UI.addTextMaxItem();
        }
        UI.clearInput();
    };

    const deleteItem = (id) => {
        Model.deleteAction(id);
        UI.removeAction(id);
        UI.deleteTextMaxItem();
    };

    let editItem = (id) => {
        UI.renderEditField(id);
        document.querySelector('.saveNameImg').addEventListener('click', () => {
            let name = document.querySelector('.editInput').value;
            document.querySelector('.actions').removeChild(document.querySelector('.saveNameImg').parentElement);
            Model.editAction(id, name);
            document.getElementById(`${id}`).querySelector('.itemText').textContent = name;
        })
    };


    return {
        init() {
            setupEventListeners();
        }
    }

})(UIController, ModelController);


Controller.init();
