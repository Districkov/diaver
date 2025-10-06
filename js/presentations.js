// FULLSCREEN PDF Presentation System
class PDFPresentation {
    constructor() {
        this.modal = document.getElementById('pdfModal');
        this.pdfViewer = document.getElementById('pdfViewer');
        this.pdfTitle = document.getElementById('pdfModalTitle');
        this.pdfDownload = document.getElementById('pdfDownload');
        this.modalClose = document.getElementById('pdfModalClose');
        this.init();
    }

    init() {
        this.bindEvents();
        this.createPDFMapping();
        this.createControls();
    }

    // Маппинг презентаций по решениям
    createPDFMapping() {
        this.pdfFiles = {
            'ias-upravlencheskiy-uchet': {
                file: '../assets/presentations/ias-upravlencheskiy-uchet.pdf',
                title: 'ИАС «Управленческий учет»',
                download: 'ИАС-Управленческий-учет-ДИАВЕР.pdf'
            },
            'ais-kadastr': {
                file: '../assets/presentations/ais-kadastr.pdf',
                title: 'АИС «Кадастр»',
                download: 'АИС-Кадастр-ДИАВЕР.pdf'
            },
            'sistema-kontur': {
                file: '../assets/presentations/sistema-kontur.pdf',
                title: 'Система «Контур»',
                download: 'Система-Контур-ДИАВЕР.pdf'
            },
            'upravlenie-investiciyami': {
                file: '../assets/presentations/upravlenie-investiciyami.pdf',
                title: 'Система управления инвестиционной деятельностью',
                download: 'Управление-инвестициями-ДИАВЕР.pdf'
            },
            'avtomatizaciya-konkursov': {
                file: '../assets/presentations/avtomatizaciya-konkursov.pdf',
                title: 'Автоматизация конкурсных процедур',
                download: 'Автоматизация-конкурсов-ДИАВЕР.pdf'
            },
            'sistema-subsidiy': {
                file: '../assets/presentations/sistema-subsidiy.pdf',
                title: 'Система поддержки субсидий',
                download: 'Система-субсидий-ДИАВЕР.pdf'
            }
        };
    }

    // Создание дополнительных контролов
    createControls() {
        const controls = document.createElement('div');
        controls.className = 'pdf-controls';
        controls.innerHTML = `
            <button class="control-btn" id="pdfZoomIn" title="Увеличить">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2"/>
                </svg>
            </button>
            <button class="control-btn" id="pdfZoomOut" title="Уменьшить">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14" stroke="currentColor" stroke-width="2"/>
                </svg>
            </button>
            <button class="control-btn" id="pdfFullscreen" title="Полный экран">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" stroke="currentColor" stroke-width="2"/>
                </svg>
            </button>
        `;
        this.modal.appendChild(controls);

        // Обработчики для контролов
        document.getElementById('pdfZoomIn').addEventListener('click', () => this.zoomIn());
        document.getElementById('pdfZoomOut').addEventListener('click', () => this.zoomOut());
        document.getElementById('pdfFullscreen').addEventListener('click', () => this.toggleFullscreen());
    }

    bindEvents() {
        // Закрытие модального окна
        this.modalClose.addEventListener('click', () => this.closeModal());
        
        // Закрытие по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });

        // Обработчики для кнопок презентаций
        document.addEventListener('click', (e) => {
            const presentationBtn = e.target.closest('.btn-view-pdf');
            if (presentationBtn) {
                e.preventDefault();
                const solutionId = presentationBtn.dataset.solution;
                if (solutionId) {
                    this.openPresentation(solutionId);
                }
            }
        });
    }

    openPresentation(solutionId) {
        const presentation = this.pdfFiles[solutionId];
        
        if (!presentation) {
            console.error('Presentation not found for:', solutionId);
            alert('Презентация временно недоступна. Свяжитесь с нами для получения материалов.');
            return;
        }

        // Устанавливаем заголовок
        this.pdfTitle.textContent = presentation.title;

        // Устанавливаем PDF
        this.pdfViewer.src = presentation.file;

        // Настраиваем кнопку скачивания
        this.pdfDownload.href = presentation.file;
        this.pdfDownload.download = presentation.download;

        // Показываем модальное окно
        this.modal.classList.add('active');
        document.body.classList.add('modal-open');

        // Фокус для доступности
        this.modalClose.focus();
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        
        // Очищаем PDF viewer
        setTimeout(() => {
            this.pdfViewer.src = '';
        }, 300);
    }

    // Функции масштабирования
    zoomIn() {
        const iframe = this.pdfViewer;
        if (iframe.contentDocument) {
            // Для встроенных PDF
            iframe.style.transform = iframe.style.transform 
                ? `scale(${parseFloat(iframe.style.transform.replace('scale(', '')) + 0.1})`
                : 'scale(1.1)';
        }
    }

    zoomOut() {
        const iframe = this.pdfViewer;
        if (iframe.contentDocument) {
            const currentScale = iframe.style.transform 
                ? parseFloat(iframe.style.transform.replace('scale(', ''))
                : 1;
            if (currentScale > 0.5) {
                iframe.style.transform = `scale(${currentScale - 0.1})`;
            }
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.modal.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }

    // Метод для ручного открытия презентации
    showPresentation(solutionId) {
        this.openPresentation(solutionId);
    }
}

// Инициализация системы презентаций
let pdfPresentation;

document.addEventListener('DOMContentLoaded', () => {
    pdfPresentation = new PDFPresentation();
});

// Глобальная функция для вызова из HTML
function showPresentation(solutionId) {
    if (pdfPresentation) {
        pdfPresentation.showPresentation(solutionId);
    }
}