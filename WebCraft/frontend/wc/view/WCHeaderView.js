function createHeaderButton(action, text)
{
    let button = document.createElement('button');
    button.type = 'button';
    button.dataset.action = action;
    button.title = text;
    button.setAttribute('aria-label', text);

    let icon = document.createElement('img');
    icon.src = './img/icons/' + action + '.svg';
    icon.alt = '';
    icon.width = 20;
    icon.height = 20;
    button.appendChild(icon);
    return button;
}

class WCHeaderView extends HTMLElement
{
    constructor()
    {
        super();

        let header = document.createElement('header');

        let title = document.createElement('h1');
        title.classList.add('wc-brand');

        let logo = document.createElement('img');
        logo.src = './img/webcraft-logo.svg';
        logo.alt = 'WebCraft - Editor de bloques HTML y CSS';
        logo.classList.add('wc-brand-logo');
        title.appendChild(logo);

        this.actions = document.createElement('div');
        this.actions.classList.add('acciones');
        this.actions.appendChild(createHeaderButton('preview', 'Previsualizar HTML'));
        this.actions.appendChild(createHeaderButton('save', 'Guardar'));
        this.actions.appendChild(createHeaderButton('download-html', 'Descargar HTML'));
        this.actions.appendChild(createHeaderButton('export-png', 'Exportar a PNG'));
        this.actions.appendChild(createHeaderButton('save-project', 'Descargar proyecto'));
        this.actions.appendChild(createHeaderButton('open-project', 'Abrir proyecto'));

        header.appendChild(title);
        header.appendChild(this.actions);
        this.appendChild(header);

        this._onActionsClick = this._onActionsClick.bind(this);
        this.actions.addEventListener('click', this._onActionsClick);
    }

    connectedCallback()
    {

    }

    disconnectedCallback()
    {

    }

    _onActionsClick(event)
    {
        let button = event.target.closest('[data-action]');
        if (!button)
        {
            return;
        }

        this.dispatchEvent(new CustomEvent('request', {
            detail: { action: button.dataset.action }
        }));
    }

    announce(eventName, html)
    {
        this.dispatchEvent(new CustomEvent(eventName, {
            bubbles: true,
            detail: { html: html }
        }));
    }
}

customElements.define('wc-header', WCHeaderView);

export { WCHeaderView };
