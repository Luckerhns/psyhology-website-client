export interface ITherapySecondContent {
  heading?: string;
  heading_content?: string;
  list_heading: string;
  list?: string[];
}

export interface ITherapyPage {
  title?: string;
  title_content?: string;
  title_image?: string;
  content?: ITherapySecondContent[];
}

export interface ITherapyPageType {
  psycho: ITherapyPage;
  family_psycho: ITherapyPage;
  consulting: ITherapyPage;
}
