interface IDeveloperData {
  name: string;
  skills: string[];
  salary: number;
  title: 'junior' | 'middle' | 'senior';
}

abstract class DeveloperMemento implements IDeveloperData {
  name: string;
  skills: string[];
  salary: number;
  title: 'junior' | 'middle' | 'senior';

  private store: { [key: string]: string } = {};

  public save(key: string): void {
    var screenShot = JSON.stringify(this);
    this.store[key] = screenShot;
  }

  public restore(key: string): void {
    const screenShot: IDeveloperData = JSON.parse(this.store[key]);
    this.name = screenShot.name;
    this.salary = screenShot.salary;
    this.skills = screenShot.skills;
    this.title = screenShot.title;
  }
}

class Developer extends DeveloperMemento implements IDeveloperData {
  public name: string;
  public skills: string[];
  public salary: number;
  public title: 'junior' | 'middle' | 'senior';

  constructor(data: IDeveloperData) {
    super();
    this.name = data.name;
    this.skills = data.skills;
    this.salary = data.salary;
    this.title = data.title;
  }

  public show(): void {
    console.log({
        name: this.name,
        skills: this.skills,
        title: this.title,
        salary: this.salary,
    })
  }
}

var john = new Developer({
  name: 'John',
  salary: 1000,
  skills: ['js', 'css', 'html'],
  title: 'junior',
});

john.save('junior');
john.show();

john.title = 'middle';
john.salary = 2000;
john.skills = ['js', 'css', 'html', 'sql', 'mongodb'];
john.save('middle');
john.show();

john.title = 'senior';
john.salary = 3000;
john.skills = ['js', 'css', 'html', 'sql', 'mongodb', 'patterns', 'algorithms'];
john.save('senior');
john.show();

john.restore('junior')
john.show();

john.restore('middle')
john.show();

john.restore('senior')
john.show();

