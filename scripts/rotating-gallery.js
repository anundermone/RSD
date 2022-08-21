export function initialiseGalleries() {
    const galleries = document.getElementsByClassName('rotating-gallery')
    
    for (const gallery of galleries) {
        initialiseGallery(gallery)
    }
}

function initialiseGallery(gallery) {
    items = gallery.getElementsByClassName('rotating-gallery__item')
    forwardButton = gallery.getElementsByClassName('rotating-gallery__button--forward')[0]
    backButton = gallery.getElementsByClassName('rotating-gallery__button--back')[0]

    const galleryController = new RotatingGallery(items)
    galleryController.setItemClasses()

    this.forwardButton.addEventListener('click', () => {
        galleryController.clickForward()
    })

    this.backButton.addEventListener('click', () => {
        galleryController.clickBack()
    })
}

class RotatingGallery {
    classPrefix = 'rotating-gallery__item--position'

    constructor(items) {
        this.items = items
        this.focussedIndex = 0
        this.itemCount = items.length
    }

    setItemClasses() {
        for (let i = 0; i < this.itemCount; i++) {
            this.setItemClass(this.items[i], i)
        }
    }

    setItemClass(element, index) {
        const classList = [...element.classList]
        const currentClass = classList.filter(c => c.startsWith(this.classPrefix))?.[0]
        const newClass = this.getItemClass(index)

        if (currentClass) {
            element.classList.replace(currentClass, newClass)
        }

        element.classList.add(newClass)
    }

    getItemClass(index) {
        if (index === this.focussedIndex) {
            return `${this.classPrefix}-front`
        }

        if (index === this.normaliseIndex(this.focussedIndex - 1)) {
            return `${this.classPrefix}-left`
        }

        if (index === this.normaliseIndex(this.focussedIndex + 1)) {
            return `${this.classPrefix}-right`
        }

        return `${this.classPrefix}-back`
    }

    clickForward() {
        this.focussedIndex = this.normaliseIndex(this.focussedIndex + 1)
        this.setItemClasses()
    }

    clickBack() {
        this.focussedIndex = this.normaliseIndex(this.focussedIndex - 1)
        this.setItemClasses()
    }

    normaliseIndex(index) {
        if (index < 0) {
            return index + this.itemCount
        }

        return index % this.itemCount
    }
}
