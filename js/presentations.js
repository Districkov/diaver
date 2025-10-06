// PDF Presentation System
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
    }

    // Маппинг презентаций по решениям
    createPDFMapping() {
        this.pdfFiles = {
            'ias-upravlencheskiy-uchet': {
                file: 'presentations/ias-upravlencheskiy-uchet.pdf',
                title: 'ИАС «Управленческий учет»',
                download: 'ИАС-Управленческий-учет-ДИАВЕР.pdf'
            },
            'ais-kadastr': {
                file: 'presentations/ais-kadastr.pdf',
                title: 'АИС «Кадастр»',
                download: 'АИС-Кадастр-ДИАВЕР.pdf'
            },
            'sistema-kontur': {
                file: 'presentations/sistema-kontur.pdf',
                title: 'Система «Контур»',
                download: 'Система-Контур-ДИАВЕР.pdf'
            },
            'upravlenie-investiciyami': {
                file: 'presentations/upravlenie-investiciyami.pdf',
                title: 'Система управления инвестиционной деятельностью',
                download: 'Управление-инвестициями-ДИАВЕР.pdf'
            },
            'avtomatizaciya-konkursov': {
                file: 'presentations/avtomatizaciya-konkursov.pdf',
                title: 'Автоматизация конкурсных процедур',
                download: 'Автоматизация-конкурсов-ДИАВЕР.pdf'
            },
            'sistema-subsidiy': {
                file: 'presentations/sistema-subsidiy.pdf',
                title: 'Система поддержки субсидий',
                download: 'Система-субсидий-ДИАВЕР.pdf'
            }
        };
    }

    bindEvents() {
        // Закрытие модального окна
        this.modalClose.addEventListener('click', () => this.closeModal());
        
        // Закрытие по клику на фон
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

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
                const solutionId = presentationBtn.closest('.solution-detailed-card').dataset.solution || 
                                 presentationBtn.dataset.solution;
                this.openPresentation(solutionId);
            }
        });
    }

    openPresentation(solutionId) {
        const presentation = this.pdfFiles[solutionId];
        
        if (!presentation) {
            console.error('Presentation not found for:', solutionId);
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
        document.body.style.overflow = 'hidden';

        // Фокус для доступности
        this.modalClose.focus();
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Очищаем PDF viewer
        setTimeout(() => {
            this.pdfViewer.src = '';
        }, 300);
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