import { DeepPartial, IFLProject } from "~@/types";
export class ProjectBuilder {
  private data: DeepPartial<IFLProject> = {
    id: 1,
    jobs: ["1", "2", "3"],
    jobString: "GRAPHQL, JAVASCRIPT, MONGODB"
  };

  public build(): IFLProject {
    return this.data as IFLProject;
  }

  public setJobslist(jobIds: number[]) {
    this.data.jobs = jobIds.map(jobId => jobId.toString());
    return this;
  }

  public setBudget(min: number, max: number) {
    this.data.minbudget = min.toString();
    this.data.maxbudget = max.toString();
    return this;
  }
  public setExchangeRate(rate: number) {
    this.data.exchangerate = rate.toString();
    return this;
  }

  public setJobDesc(text: string) {
    this.data.appended_descr = text;
    return this;
  }

  public setNDA(value: boolean) {
    this.data.nda = value;
    return this;
  }
  public setType(value: string) {
    this.data.type = value;
    return this;
  }

  public setNonPublic(value: boolean) {
    this.data.nonpublic = value;
    return this;
  }

  public setFullTime(value: boolean) {
    this.data.fulltime = value;
    return this;
  }
  public setFreeBid(value: number) {
    this.data.free_bid_until = value.toString();
    return this;
  }

  public setId(id: number) {
    this.data.id = id;
    return this;
  }
  public setLink(link: string) {
    this.data.linkUrl = link;
    return this;
  }
}
