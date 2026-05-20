import type { ResumeContact } from './resume-contact'
import type { ResumeExperience } from './resume-experience'
import type { ResumeSkillGroup } from './resume-skill-group'

export type ResumePage = {
  name: string
  contact: ResumeContact
  summary: string
  skills: ResumeSkillGroup[]
  experience: ResumeExperience[]
}
