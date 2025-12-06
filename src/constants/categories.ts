export interface Category {
    id: number;
    name: string;
}

export const JOB_CATEGORIES: Category[] = [
    { id: 1, name: "ACCOUNTANT" },
    { id: 2, name: "ADVOCATE" },
    { id: 3, name: "AGRICULTURE" },
    { id: 4, name: "APPAREL" },
    { id: 5, name: "ARTS" },
    { id: 6, name: "AUTOMOBILE" },
    { id: 7, name: "AVIATION" },
    { id: 8, name: "BANKING" },
    { id: 9, name: "BPO" },
    { id: 10, name: "BUSINESS-DEVELOPMENT" },
    { id: 11, name: "CHEF" },
    { id: 12, name: "CONSTRUCTION" },
    { id: 13, name: "CONSULTANT" },
    { id: 14, name: "DESIGNER" },
    { id: 15, name: "DIGITAL-MEDIA" },
    { id: 16, name: "ENGINEERING" },
    { id: 17, name: "FINANCE" },
    { id: 18, name: "FITNESS" },
    { id: 19, name: "HEALTHCARE" },
    { id: 20, name: "HR" },
    { id: 21, name: "INFORMATION-TECHNOLOGY" },
    { id: 22, name: "PUBLIC-RELATIONS" },
    { id: 23, name: "SALES" },
    { id: 24, name: "TEACHER" },
];

export function formatCategoryName(name: string): string {
    return name
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}
