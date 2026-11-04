import FakeProjectsRepository from "../repositories/fakes/projects.repository";
import ListSpeakers from "./ListSpeakers.service";

describe("ListSpeakers", () => {
  it("lists speakers ordered by name", async () => {
    const repository = new FakeProjectsRepository();
    const service = new ListSpeakers(repository);
    await repository.createSpeaker({ about: "", name: "Zelda", photoUrl: "" });
    await repository.createSpeaker({ about: "", name: "Ana", photoUrl: "" });

    const speakers = await service.execute();

    expect(speakers.map(speaker => speaker.name)).toEqual(["Ana", "Zelda"]);
  });
});